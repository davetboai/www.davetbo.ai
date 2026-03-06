"use client";

import { ReactNode } from "react";
import { Amplify } from "aws-amplify";
import { Authenticator, ThemeProvider, Theme } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const AUTH_ENABLED = process.env.NEXT_PUBLIC_AUTH_ENABLED === "true";
const COGNITO_USER_POOL_ID = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "";
const COGNITO_CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "";

if (AUTH_ENABLED && COGNITO_USER_POOL_ID && COGNITO_CLIENT_ID) {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: COGNITO_USER_POOL_ID,
        userPoolClientId: COGNITO_CLIENT_ID,
      },
    },
  });
}

const theme: Theme = {
  name: "davetbo-auth",
  tokens: {
    colors: {
      brand: {
        primary: {
          10: { value: "#f0f9ff" },
          20: { value: "#e0f2fe" },
          40: { value: "#7dd3fc" },
          60: { value: "#0ea5e9" },
          80: { value: "#0284c7" },
          90: { value: "#0369a1" },
          100: { value: "#0a1628" },
        },
      },
    },
    components: {
      authenticator: {
        router: {
          borderWidth: { value: "0" },
          boxShadow: { value: "0 8px 32px rgba(10, 22, 40, 0.3)" },
          borderColor: { value: "transparent" },
        },
      },
      button: {
        primary: {
          backgroundColor: { value: "#0ea5e9" },
          _hover: {
            backgroundColor: { value: "#0284c7" },
          },
        },
      },
      fieldcontrol: {
        borderRadius: { value: "8px" },
      },
      tabs: {
        item: {
          _active: {
            color: { value: "#0ea5e9" },
            borderColor: { value: "#0ea5e9" },
          },
        },
      },
    },
  },
};

export default function DevAuthGate({ children }: { children: ReactNode }) {
  if (!AUTH_ENABLED) return <>{children}</>;

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0a1628 0%, #1e293b 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h2
            style={{
              color: "#fff",
              fontSize: "24px",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            davetbo.ai Preview
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "14px" }}>
            This site is password protected during development.
          </p>
        </div>
        <Authenticator hideSignUp>
          {() => <>{children}</>}
        </Authenticator>
      </div>
    </ThemeProvider>
  );
}
