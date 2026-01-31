import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AfroLuxe Marketplace - African Services in the UK',
  description: 'Connect with verified African service providers in your area.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
