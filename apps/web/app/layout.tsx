import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/navigation'

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
        <Navigation />
        {children}
      </body>
    </html>
  )
}
