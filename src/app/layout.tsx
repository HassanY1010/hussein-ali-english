import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export const metadata: Metadata = {
  title: {
    default: "حسين علي | أكاديمية تعلم اللغة الإنجليزية",
    template: "%s | حسين علي - تعلم الإنجليزية",
  },
  description:
    "المنصة التعليمية الرسمية للأستاذ حسين علي لتعليم اللغة الإنجليزية من الصفر حتى الاحتراف. شروحات مبسطة، كورس شامل، دروس تفاعلية ومتابعة مستمرة.",
  keywords: [
    "تعلم الإنجليزية",
    "حسين علي",
    "قواعد اللغة الإنجليزية",
    "محادثة إنجليزية",
    "English with Hussein",
    "كورسات إنجليزي مجانية",
  ],
  authors: [{ name: "حسين علي", url: "https://t.me/gccxic" }],
  creator: "حسين علي",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://hussein-ali-english.onrender.com"
  ),
  openGraph: {
    title: "حسين علي | أكاديمية تعلم اللغة الإنجليزية",
    description:
      "تعلّم اللغة الإنجليزية بمنهجية علمية واضحة ومبسطة مع الأستاذ حسين علي. كورسات شاملة في القواعد، المحادثة والنطق.",
    url: "https://hussein-ali-english.onrender.com",
    siteName: "حسين علي - تعلم الإنجليزية",
    locale: "ar_IQ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "حسين علي | أكاديمية تعلم اللغة الإنجليزية",
    description:
      "تعلّم اللغة الإنجليزية بمنهجية علمية واضحة ومبسطة مع الأستاذ حسين علي. كورسات شاملة في القواعد، المحادثة والنطق.",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#13211D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Hussein Ali English Academy",
    alternateName: "أكاديمية حسين علي لتعلم الإنجليزية",
    url: "https://hussein-ali-english.onrender.com",
    logo: "https://hussein-ali-english.onrender.com/favicon.ico",
    description: "المنصة الرسمية للأستاذ حسين علي لتعليم اللغة الإنجليزية بمنهجية علمية واضحة ومبسطة.",
    founder: {
      "@type": "Person",
      name: "حسين علي",
      jobTitle: "أستاذ ومطور محتوى تعليمي للغة الإنجليزية",
      url: "https://t.me/gccxic",
    },
    sameAs: ["https://t.me/gccxic"],
  };

  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Tajawal:wght@300;400;500;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-paper-50 text-ink selection:bg-accent/20 selection:text-ink overflow-x-hidden">
        {/* Skip to main content accessibility link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-sm focus:shadow-lifted font-bold"
        >
          انتقل إلى المحتوى الرئيسي / Skip to content
        </a>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
