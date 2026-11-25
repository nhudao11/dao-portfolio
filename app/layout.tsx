import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { fontVariables } from "./fonts";
import { LanguageProvider } from "@/lib/i18n";
import { profile } from "@/content/profile";
import "./globals.css";

const title = "Trần Như Đào — QC Engineer";
const description =
  "QC Engineer with 4+ years of experience in manual, automation (Playwright, TypeScript) and AI-assisted testing for web and mobile products in real estate, automotive and retail.";

export const metadata: Metadata = {
  // Origin only: Next adds the basePath to generated asset URLs itself.
  metadataBase: new URL(new URL(profile.site).origin),
  title: { default: title, template: "%s — Trần Như Đào" },
  description,
  applicationName: "DAO.",
  authors: [{ name: profile.name, url: profile.site }],
  creator: profile.name,
  keywords: ["QC Engineer", "QA Engineer", "Software Testing", "Playwright", "TypeScript", "Automation Testing", "AI-assisted QA", "Manual Testing", "Trần Như Đào", "Ho Chi Minh City"],
  alternates: { canonical: `${profile.site}/` },
  openGraph: {
    type: "profile",
    url: `${profile.site}/`,
    siteName: "DAO. — Trần Như Đào",
    title,
    description,
    locale: "en_US",
    alternateLocale: ["vi_VN"],
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f4f1e9",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "QC Engineer",
  email: `mailto:${profile.email}`,
  telephone: "+84776138500",
  url: profile.site,
  knowsAbout: ["Manual Testing", "Automation Testing", "Playwright", "TypeScript", "AI-assisted QA", "Requirement Analysis", "Test Design"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
