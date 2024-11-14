import Head from 'next/head';
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: 'Trading Janken',
  description: '超簡単なTCG風ゲーム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <Head>
      <Analytics/>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-P01LS0XE5T"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-P01LS0XE5T');
            `,
          }}
        />
      </Head>
      <body>{children}</body>
    </html>
  )
}
