import type { Metadata, Viewport } from "next";
import "./globals.css";

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
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-paper-50 text-ink selection:bg-accent/20 selection:text-ink">
        {children}
      </body>
    </html>
  );
}
