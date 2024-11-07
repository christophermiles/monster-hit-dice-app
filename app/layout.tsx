import React from 'react'
import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import { Martian_Mono as Font } from 'next/font/google'
import '../styles/globals.css'
import clsx from 'clsx'
import Link from 'next/link'
import MainHeader from '@/components/MainHeader'

export const metadata: Metadata = {
  title: 'Hit Dice App',
  description:
    'An app for generating a range of Hit Point values from Dungeons & Dragons Hit Dice expressions',
  keywords: ['Dungeons & Dragons', 'D&D', 'Hit Points', 'Hit Dice'],
  generator: 'Next.js',
}

export const viewport: Viewport = {
  themeColor: 'white',
  colorScheme: 'only light',
  userScalable: false,
}

const font = Font({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  fallback: [
    'ui-monospace',
    'SFMono-Regular', // macOS 10.15+, iOS 13.3+
    'Menlo', // macOS
    'Droid Sans Mono', // Android
    'Cascadia Code', // Windows 11+
    'Consolas', // Windows 7+
    'DejaVu Sans Mono', // Linux
    'Source Code Pro', // Linux
    'monospace',
  ],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={clsx(
        font.className,
        'antialiased',
        'text-[14px] sm:text-[16px] text-neutral-700',
      )}
    >
      <body className="bg-neutral-50">
        <ThemeProvider>
          <div className="main-layout min-h-screen grid-rows-[1fr_auto_auto] pt-8">
            <header className="main-layout-content row-start-2 flex items-baseline justify-center flex-wrap gap-8">
              <MainHeader />
            </header>

            <main className="main-layout-content row-start-1 pb-32">
              {children}
            </main>

            <footer className="main-layout-content row-start-3 py-8 flex items-baseline justify-center flex-wrap gap-8">
              <div className="flex items-baseline gap-8 text-xs">
                <Link href="/about" className="link">
                  What is this?
                </Link>
                <a href="/code" className="link">
                  Code
                </a>
                <Link href="/legal" className="link">
                  Legal
                </Link>
              </div>
              <p className="text-xs text-neutral-500">
                Made in <span className="text-lg">🇦🇺</span> by{' '}
                <a href="https://christophermiles.com.au" className="link">
                  Christopher Miles
                </a>
              </p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
