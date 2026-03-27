import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import {AppHeader} from "@/components/portfolio/app-header";
import {SideNavBar} from "@/components/portfolio/side-nav-bar";
import {FileSystemProvider} from "@/context/file-system-context";
import {NuqsAdapter} from "nuqs/adapters/next";
import React, { Suspense } from "react";

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
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Suspense fallback={null}>
          <NuqsAdapter>
            <FileSystemProvider>
              <div className="h-screen bg-background text-foreground font-sans selection:bg-primary/30 flex flex-col overflow-hidden">
                <AppHeader />
                <div className="flex flex-row flex-1 min-h-0">
                  <SideNavBar />
                  {children}
                </div>
              </div>
            </FileSystemProvider>
          </NuqsAdapter>
        </Suspense>
      </body>
    </html>
  )
}
