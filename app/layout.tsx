import Script from 'next/script';
import { Analytics } from "@vercel/analytics/react";
import { ChakraProvider } from "@chakra-ui/react"
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <title>Trading Janken</title>
        <meta name="description" content="超簡単なTCG風ゲーム" />
      </head>
      <body>
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-P01LS0XE5T"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-P01LS0XE5T');
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
