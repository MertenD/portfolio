"use client"

import React, { Suspense, useState } from "react"
import { NuqsAdapter } from "nuqs/adapters/next"
import { QueryClientProvider } from "@tanstack/react-query"
import { QueryClient } from "@tanstack/query-core"
import { FileSystemProvider } from "@/context/file-system-context"
import { ChatProvider } from "@/context/chat-context"
import { SideBarProvider } from "@/context/side-bar-context"
import { AppHeader } from "@/components/portfolio/app-header"
import { SideNav } from "@/components/portfolio/side-nav"

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <Suspense fallback={null}>
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>
          <FileSystemProvider>
            <ChatProvider>
              <SideBarProvider>
                <div className="h-screen bg-background text-foreground font-sans selection:bg-primary/30 flex flex-col overflow-hidden">
                  <AppHeader />
                  <div className="flex flex-row flex-1 min-h-0">
                    <SideNav />
                    {children}
                  </div>
                </div>
              </SideBarProvider>
            </ChatProvider>
          </FileSystemProvider>
        </QueryClientProvider>
      </NuqsAdapter>
    </Suspense>
  )
}
