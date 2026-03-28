import React, {Suspense} from "react";
import {NuqsAdapter} from "nuqs/adapters/next";
import {FileSystemProvider} from "@/context/file-system-context";
import {SideBarProvider} from "@/context/side-bar-context";
import {ThemeProvider} from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>
    <NuqsAdapter>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        storageKey="portfolio-theme"
      >
        <FileSystemProvider>
          <SideBarProvider>
            {children}
          </SideBarProvider>
        </FileSystemProvider>
      </ThemeProvider>
    </NuqsAdapter>
  </Suspense>
}