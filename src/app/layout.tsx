import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { unsplash, photo } from "@/data/images";

// Fonts are self-hosted (OFL-licensed Manrope + Inter variable files in ./fonts) so the build
// works offline and no request goes to Google at runtime. To use next/font/google instead,
// swap these two declarations; the CSS variable names stay the same.
const manrope = localFont({
  src: "./fonts/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});
const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

const ogImage = unsplash(photo.heroBuilding, 1200);

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "SUPGS | Commercial spaces for rent & everyday facilities", template: "%s | SUPGS" },
  description: siteConfig.description,
  applicationName: "SUPGS",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "SUPGS",
    title: "SUPGS | Commercial spaces for rent & everyday facilities",
    description: siteConfig.description,
    url: "/",
    images: [{ url: ogImage, width: 1200, height: 800, alt: "Modern commercial building facade" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SUPGS | Commercial spaces for rent & everyday facilities",
    description: siteConfig.description,
    images: [ogImage],
  },
};

export const viewport: Viewport = { themeColor: "#14532D", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-forest px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Providers>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
