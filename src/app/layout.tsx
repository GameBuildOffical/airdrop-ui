import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '$GAME Airdrop',
  description: 'Claim your GameBuild token',
  icons: {
    icon: '/airdrop/assets/favicon.ico',
    shortcut: '/airdrop/assets/favicon.ico',
    apple: '/airdrop/assets/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
