import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import {AppHeader} from "@/components/portfolio/app-header";
import React from "react";
import Providers from "@/components/providers";
import {SideNav} from "@/components/portfolio/side-nav";

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
  title: 'Engineer Portfolio | Full Stack Developer',
  description: 'Full Stack Engineer Portfolio - Architecting Scalable Solutions',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Providers>
          <div className="h-screen bg-background text-foreground font-sans selection:bg-primary/30 flex flex-col overflow-hidden">
            <AppHeader />
            <div className="flex flex-row flex-1 min-h-0">
              <SideNav />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
