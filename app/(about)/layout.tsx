import { HomeLink } from '@/components/HomeLink'
import React from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex flex-col gap-16">
      <HomeLink />

      <article className="prose prose-neutral prose-strong:font-medium prose-headings:font-medium">
        {children}
      </article>
    </div>
  )
}
