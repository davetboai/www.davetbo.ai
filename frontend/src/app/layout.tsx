import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Merriweather } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DevAuthGate from "@/components/DevAuthGate";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ["latin"],
  variable: '--font-merriweather'
});

export const metadata: Metadata = {
  title: "Dave Thibault | Sr. Applied AI Architect at AWS",
  description: "Senior Applied AI Architect at AWS. Helping customers build with Generative AI, RAG, Graph RAG, and cloud-native architectures. Technical writer and open source contributor.",
  keywords: ["Dave Thibault", "AWS", "Applied AI Architect", "Generative AI", "RAG", "Graph RAG", "Cloud Architecture", "MLOps", "AI Solutions"],
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: "Dave Thibault | Sr. Applied AI Architect at AWS",
    description: "Senior Applied AI Architect at AWS. Building anything we can envision.",
    type: "website",
    locale: "en_US",
    siteName: "davetbo.ai",
    url: "https://www.davetbo.ai",
    images: [
      {
        url: "https://www.davetbo.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dave Thibault - Sr. Applied AI Architect at AWS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dave Thibault | Sr. Applied AI Architect at AWS",
    description: "Senior Applied AI Architect at AWS. Building anything we can envision.",
    images: ["https://www.davetbo.ai/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script defer src="https://analytics.davetbo.ai/script.js" data-website-id="www-davetbo-ai"></script>
      </head>
      <body className={`${plusJakarta.className} ${merriweather.variable}`}>
        <DevAuthGate>
          <Header />
          {children}
          <Footer />
        </DevAuthGate>
      </body>
    </html>
  );
}
