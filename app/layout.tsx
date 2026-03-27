import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import {AppHeader} from "@/components/portfolio/app-header";
import {SideNavBar} from "@/components/portfolio/side-nav-bar";
import {FileExplorer} from "@/components/portfolio/file-explorer";
import OpenFiles from "@/components/portfolio/open-files";
import {FileSystemProvider} from "@/context/file-system-context";
import {NuqsAdapter} from "nuqs/adapters/next";
import React from "react";

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
        <NuqsAdapter>
          <FileSystemProvider>
            <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 flex">
              <AppHeader />
              <SideNavBar />
              <FileExplorer />
              <OpenFiles />

              <main className="ml-12 md:ml-76 mt-20 min-h-[calc(100vh-80px)] flex-1 overflow-y-auto">
                {children}
              </main>
            </div>
          </FileSystemProvider>
        </NuqsAdapter>
      </body>
    </html>
  )
}
