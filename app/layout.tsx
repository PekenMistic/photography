import type { Metadata } from "next"
import { Inter, Playfair_Display, Montserrat } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { DatabaseProvider } from "@/lib/database-context"
import { ToastProvider } from "@/components/ui/luxury-toast"
import ConditionalLayout from "@/components/ConditionalLayout"
import { generateMetadata, structuredData } from "@/lib/seo-config"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" })
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap"
})

export const metadata: Metadata = generateMetadata({
  title: "Professional Photography Services in Madiun",
  description: "Capture your precious moments with Madiun Photography. Specializing in weddings, portraits, events, and commercial photography with artistic vision and technical excellence.",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="uXt5flb09gzMYjciDairuMSOyIUzuD3a1xrPV8RZsEI" />
        <link rel="canonical" href="https://madiunphotography.com" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f3a73f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Madiun Photography" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${montserrat.variable} font-sans antialiased`}>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-38YVB9VHYH" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-38YVB9VHYH');
        `}</Script>
        <Script id="google-tag-manager" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M75R3SVR');
        `}</Script>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M75R3SVR"
            height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ToastProvider>
            <DatabaseProvider>
              {/* ConditionalLayout handles hiding Navbar/Footer on /admin */}
              <ConditionalLayout>{children}</ConditionalLayout>
            </DatabaseProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
