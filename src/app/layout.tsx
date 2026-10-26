import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Spin & Speak — Impromptu Topic Generator',
  description:
    'Pick a category, spin, and speak on a random topic. Free impromptu speaking practice tool.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  )
}
