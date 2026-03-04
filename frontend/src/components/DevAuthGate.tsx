"use client";

import { useState, useEffect, useCallback, ReactNode, FormEvent } from "react";

const COGNITO_USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "";
const COGNITO_CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "";
const AUTH_ENABLED = process.env.NEXT_PUBLIC_AUTH_ENABLED === "true";
const STORAGE_KEY = "davetbo_dev_auth";

function getCognitoUrl(): string {
  const region = COGNITO_USER_POOL_ID.split("_")[0];
  return `https://cognito-idp.${region}.amazonaws.com`;
}

async function cognitoRequest(target: string, body: Record<string, unknown>) {
  const res = await fetch(getCognitoUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-amz-json-1.1",
      "X-Amz-Target": `AWSCognitoIdentityProviderService.${target}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || err.__type || "Cognito request failed");
  }
  return res.json();
}

function parseJwt(token: string): Record<string, unknown> {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
}

type Challenge = "login" | "new_password" | "mfa" | "mfa_setup";

export default function DevAuthGate({ children }: { children: ReactNode }) {
  if (!AUTH_ENABLED) return <>{children}</>;
  return <AuthGateInner>{children}</AuthGateInner>;
}

function AuthGateInner({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState<Challenge>("login");
  const [session, setSession] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [mfaSecretCode, setMfaSecretCode] = useState("");

  const completeAuth = useCallback(
    (authResult: { IdToken: string; AccessToken: string; RefreshToken: string }) => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          idToken: authResult.IdToken,
          accessToken: authResult.AccessToken,
          refreshToken: authResult.RefreshToken,
        })
      );
      setAuthenticated(true);
    },
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const { idToken, refreshToken } = JSON.parse(stored);
          const claims = parseJwt(idToken);
          const exp = (claims.exp as number) * 1000;
          if (Date.now() < exp) {
            setAuthenticated(true);
          } else if (refreshToken) {
            const data = await cognitoRequest("InitiateAuth", {
              AuthFlow: "REFRESH_TOKEN_AUTH",
              ClientId: COGNITO_CLIENT_ID,
              AuthParameters: { REFRESH_TOKEN: refreshToken },
            });
            const result = data.AuthenticationResult;
            localStorage.setItem(
              STORAGE_KEY,
              JSON.stringify({
                idToken: result.IdToken,
                accessToken: result.AccessToken,
                refreshToken,
              })
            );
            setAuthenticated(true);
          } else {
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
      setLoading(false);
    })();
  }, []);

  const handleSignIn = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      const form = new FormData(e.currentTarget);
      const pwd = form.get("password") as string;
      const em = form.get("email") as string;
      try {
        const data = await cognitoRequest("InitiateAuth", {
          AuthFlow: "USER_PASSWORD_AUTH",
          ClientId: COGNITO_CLIENT_ID,
          AuthParameters: { USERNAME: em, PASSWORD: pwd },
        });
        setEmail(em);

        if (data.ChallengeName === "NEW_PASSWORD_REQUIRED") {
          setSession(data.Session);
          setChallenge("new_password");
          return;
        }
        if (data.ChallengeName === "SOFTWARE_TOKEN_MFA") {
          setSession(data.Session);
          setChallenge("mfa");
          return;
        }
        if (data.ChallengeName === "MFA_SETUP") {
          const setupData = await cognitoRequest("AssociateSoftwareToken", {
            Session: data.Session,
          });
          setMfaSecretCode(setupData.SecretCode);
          setSession(setupData.Session);
          setChallenge("mfa_setup");
          return;
        }
        completeAuth(data.AuthenticationResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Sign in failed");
      }
    },
    [completeAuth]
  );

  const handleNewPassword = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      const form = new FormData(e.currentTarget);
      const newPwd = form.get("newPassword") as string;
      try {
        const data = await cognitoRequest("RespondToAuthChallenge", {
          ClientId: COGNITO_CLIENT_ID,
          ChallengeName: "NEW_PASSWORD_REQUIRED",
          Session: session,
          ChallengeResponses: { USERNAME: email, NEW_PASSWORD: newPwd },
        });
        if (data.ChallengeName === "SOFTWARE_TOKEN_MFA") {
          setSession(data.Session);
          setChallenge("mfa");
          return;
        }
        if (data.ChallengeName === "MFA_SETUP") {
          const setupData = await cognitoRequest("AssociateSoftwareToken", {
            Session: data.Session,
          });
          setMfaSecretCode(setupData.SecretCode);
          setSession(setupData.Session);
          setChallenge("mfa_setup");
          return;
        }
        completeAuth(data.AuthenticationResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Password change failed");
      }
    },
    [session, email, completeAuth]
  );

  const handleMFA = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      const form = new FormData(e.currentTarget);
      const code = form.get("mfaCode") as string;
      try {
        const data = await cognitoRequest("RespondToAuthChallenge", {
          ClientId: COGNITO_CLIENT_ID,
          ChallengeName: "SOFTWARE_TOKEN_MFA",
          Session: session,
          ChallengeResponses: { USERNAME: email, SOFTWARE_TOKEN_MFA_CODE: code },
        });
        completeAuth(data.AuthenticationResult);
      } catch (err) {
        setError(err instanceof Error ? err.message : "MFA verification failed");
      }
    },
    [session, email, completeAuth]
  );

  const handleMFASetup = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");
      const form = new FormData(e.currentTarget);
      const code = form.get("mfaCode") as string;
      try {
        await cognitoRequest("VerifySoftwareToken", {
          Session: session,
          UserCode: code,
          FriendlyDeviceName: "Authenticator",
        });
        setChallenge("login");
        setError("MFA setup complete. Please sign in again.");
      } catch (err) {
        setError(err instanceof Error ? err.message : "MFA setup failed");
      }
    },
    [session]
  );

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0a1628 0%, #1e293b 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    );
  }

  if (authenticated) return <>{children}</>;

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a1628 0%, #1e293b 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
  };
  const cardStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "40px",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 8px 32px rgba(10, 22, 40, 0.3)",
  };
  const headingStyle: React.CSSProperties = {
    color: "#0a1628",
    fontSize: "24px",
    fontWeight: 700,
    marginBottom: "8px",
    textAlign: "center" as const,
  };
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    marginBottom: "16px",
    boxSizing: "border-box" as const,
  };
  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
  };
  const errorStyle: React.CSSProperties = {
    color: "#c0392b",
    fontSize: "14px",
    marginBottom: "12px",
    textAlign: "center" as const,
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>davetbo.ai Preview</h2>
        <p style={{ color: "#64748b", textAlign: "center", marginBottom: "24px", fontSize: "14px" }}>
          This site is password protected during development.
        </p>
        {error && <p style={errorStyle}>{error}</p>}

        {challenge === "login" && (
          <form onSubmit={handleSignIn}>
            <input name="email" type="email" placeholder="Email" required style={inputStyle} />
            <input name="password" type="password" placeholder="Password" required style={inputStyle} />
            <button type="submit" style={buttonStyle}>Sign In</button>
          </form>
        )}

        {challenge === "new_password" && (
          <form onSubmit={handleNewPassword}>
            <p style={{ color: "#0a1628", marginBottom: "16px", textAlign: "center" }}>
              Please set a new password.
            </p>
            <input name="newPassword" type="password" placeholder="New password" required style={inputStyle} />
            <button type="submit" style={buttonStyle}>Set Password</button>
          </form>
        )}

        {challenge === "mfa" && (
          <form onSubmit={handleMFA}>
            <p style={{ color: "#0a1628", marginBottom: "16px", textAlign: "center" }}>
              Enter the code from your authenticator app.
            </p>
            <input name="mfaCode" type="text" placeholder="MFA code" required autoComplete="one-time-code" style={inputStyle} />
            <button type="submit" style={buttonStyle}>Verify</button>
          </form>
        )}

        {challenge === "mfa_setup" && (
          <form onSubmit={handleMFASetup}>
            <p style={{ color: "#0a1628", marginBottom: "16px", textAlign: "center" }}>
              Scan this code in your authenticator app, then enter the verification code.
            </p>
            <code
              style={{
                display: "block",
                wordBreak: "break-all",
                backgroundColor: "#f0f0f0",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "16px",
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              {mfaSecretCode}
            </code>
            <input name="mfaCode" type="text" placeholder="Verification code" required autoComplete="one-time-code" style={inputStyle} />
            <button type="submit" style={buttonStyle}>Verify & Enable MFA</button>
          </form>
        )}
      </div>
    </div>
  );
}
