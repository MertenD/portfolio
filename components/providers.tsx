"use client"

import React, {Suspense, useState} from "react";
import {NuqsAdapter} from "nuqs/adapters/next";
import {FileSystemProvider} from "@/context/file-system-context";
import {SideBarProvider} from "@/context/side-bar-context";
import {ChatProvider} from "@/context/chat-context";
import {ThemeProvider} from "next-themes";
import {QueryClientProvider} from "@tanstack/react-query";
import {QueryClient} from "@tanstack/query-core";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return <Suspense fallback={null}>
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        storageKey="portfolio-theme"
      >
        <FileSystemProvider>
          <ChatProvider>
            <SideBarProvider>
              {children}
            </SideBarProvider>
          </ChatProvider>
        </FileSystemProvider>
      </ThemeProvider>
      </QueryClientProvider>
    </NuqsAdapter>
  </Suspense>
}