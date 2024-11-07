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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
