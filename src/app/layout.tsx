import { SITE_URL } from "@/lib/site";
import { SiteFooter } from "@/components/mono/site-footer";
import { SiteNav } from "@/components/mono/site-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const body = Geist({
  subsets: ["latin"],
  variable: "--font-body",
});

// One serif, italic only, for the occasional accent phrase.
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif-face",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-face",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: SITE_URL,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
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
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          body.variable,
          serif.variable,
          mono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <TooltipProvider delayDuration={0}>
            <SiteNav email={DATA.contact.email} />
            <main className="relative min-h-dvh">{children}</main>
            <SiteFooter />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
