import type {Metadata, Viewport} from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import React from "react";
import {ThemeProvider} from "next-themes";

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
})

export const metadata: Metadata = {
  title: 'Merten Dieckmann | Portfolio',
  description: 'Portfolio of Merten Dieckmann, a full stack engineer specializing in React, Node.js, and cloud technologies. Explore projects, skills, and experience in web development.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          storageKey="portfolio-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
