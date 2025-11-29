import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/user-context";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll-provider";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://opulenss.com"), // Placeholder domain
  title: {
    default: "Opulenss | Private Members Club",
    template: "%s | Opulenss",
  },
  description: "A private, invite-only members club. A curated ecosystem of the world's most interesting people.",
  keywords: ["private club", "members club", "luxury", "exclusive", "networking", "events", "fine dining"],
  authors: [{ name: "Opulenss Team" }],
  creator: "Opulenss",
  publisher: "Opulenss",
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
    title: "Opulenss | Private Members Club",
    description: "A private, invite-only members club. A curated ecosystem of the world's most interesting people.",
    url: "https://opulenss.com",
    siteName: "Opulenss",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Opulenss Club Interior",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Opulenss | Private Members Club",
    description: "A private, invite-only members club. A curated ecosystem of the world's most interesting people.",
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Opulenss",
  url: "https://opulenss.com",
  logo: "https://opulenss.com/logo.png", // Placeholder
  description: "A private, invite-only members club.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Emerald Avenue",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10012",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-212-555-0199",
    contactType: "customer service",
    email: "concierge@opulenss.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${montserrat.variable} antialiased bg-emerald-deep text-bone font-body`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="noise-overlay" />
        <SmoothScrollProvider>
          <UserProvider>{children}</UserProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
