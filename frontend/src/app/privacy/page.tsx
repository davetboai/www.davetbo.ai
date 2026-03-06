export const metadata = {
  title: "Privacy Policy | davetbo.ai",
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#f8fafc] min-h-screen pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-[#0ea5e9] font-semibold tracking-widest uppercase text-sm mb-4">
          Legal
        </p>
        <h1 className="font-[family-name:var(--font-merriweather)] text-3xl md:text-4xl font-bold mb-8 leading-tight text-[#0a1628]">
          Privacy Policy
        </h1>

        <div className="prose prose-gray max-w-none space-y-6 text-gray-600 leading-relaxed">
          <p className="text-sm text-gray-400">
            Effective date: March 5, 2026
          </p>

          <h2 className="text-xl font-bold text-[#0a1628] mt-10">Overview</h2>
          <p>
            This website (&ldquo;davetbo.ai&rdquo;) is a personal portfolio
            site operated by Dave Thibault. Your privacy matters, and this site
            is designed to collect as little data as possible.
          </p>

          <h2 className="text-xl font-bold text-[#0a1628] mt-10">
            Analytics
          </h2>
          <p>
            This site uses a custom, self-hosted analytics system that is
            designed to be privacy-first:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>No cookies</strong> &mdash; This site does not set any
              cookies whatsoever.
            </li>
            <li>
              <strong>No personal data stored</strong> &mdash; IP addresses are
              hashed (one-way, irreversible) and used only to estimate unique
              visitor counts. Raw IP addresses are never stored.
            </li>
            <li>
              <strong>No cross-site tracking</strong> &mdash; There are no
              third-party trackers, advertising pixels, or social media widgets
              that follow you across the web.
            </li>
            <li>
              <strong>No fingerprinting</strong> &mdash; Browser fingerprinting
              techniques are not used.
            </li>
            <li>
              <strong>Minimal data collection</strong> &mdash; The only data
              collected is: page URL, referrer domain, country (derived from IP
              at request time, not stored), screen size category
              (mobile/tablet/desktop), and browser language.
            </li>
            <li>
              <strong>Auto-expiry</strong> &mdash; All analytics data is
              automatically deleted after 13 months.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-[#0a1628] mt-10">
            Third-Party Services
          </h2>
          <p>
            This site is hosted on Amazon Web Services (AWS) using Amazon
            CloudFront as a CDN. CloudFront may process your IP address to
            deliver content, subject to the{" "}
            <a
              href="https://aws.amazon.com/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0ea5e9] hover:underline"
            >
              AWS Privacy Notice
            </a>
            . Google Fonts are loaded for typography, subject to{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0ea5e9] hover:underline"
            >
              Google&apos;s Privacy Policy
            </a>
            .
          </p>
          <p>
            No other third-party services are used. There are no advertising
            networks, social media trackers, or marketing automation tools on
            this site.
          </p>

          <h2 className="text-xl font-bold text-[#0a1628] mt-10">
            External Links
          </h2>
          <p>
            This site contains links to external services (LinkedIn, Medium,
            GitHub). These sites have their own privacy policies, and clicking
            on them will take you outside of davetbo.ai.
          </p>

          <h2 className="text-xl font-bold text-[#0a1628] mt-10">
            Your Rights
          </h2>
          <p>
            Since this site does not collect personal data, store cookies, or
            maintain user accounts, there is no personal data to access, correct,
            or delete. No GDPR consent banner is required because no consent-requiring
            data processing occurs.
          </p>

          <h2 className="text-xl font-bold text-[#0a1628] mt-10">Contact</h2>
          <p>
            If you have questions about this privacy policy, you can reach me
            via{" "}
            <a
              href="https://linkedin.com/in/davetbo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0ea5e9] hover:underline"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
