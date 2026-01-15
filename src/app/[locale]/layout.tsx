import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ClientProviders from "@/components/Providers/ClientProviders";
import ServerProviders from "@/components/Providers/ServerProviders";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: {
    default: "TCM Logistic",
    template: "%s | TCM Logistic",
  },
  description:
    "TCM Logistic is a logistics management platform providing efficient shipping, tracking, and supply chain solutions.",
  keywords: [
    "logistics",
    "shipping",
    "supply chain",
    "freight",
    "transportation",
    "delivery",
    "TCM Logistic",
  ],
  authors: [{ name: "TCM Logistic" }],
  creator: "TCM Logistic",
  publisher: "TCM Logistic",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "TCM Logistic",
    title: "TCM Logistic",
    description:
      "TCM Logistic is a logistics management platform providing efficient shipping, tracking, and supply chain solutions.",
    // url: "https://your-domain.com",
    // images: [
    //   {
    //     url: "/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "TCM Logistic",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TCM Logistic",
    description:
      "TCM Logistic is a logistics management platform providing efficient shipping, tracking, and supply chain solutions.",
    // images: ["/og-image.png"],
    // creator: "@tcmlogistic",
  },
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // },
  metadataBase: new URL("https://example.com"), // Replace with your actual domain
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body
        className={`${roboto.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col transition-colors duration-200`}
      >
        <ServerProviders>
          <ClientProviders>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </ClientProviders>
        </ServerProviders>
      </body>
    </html>
  );
}
