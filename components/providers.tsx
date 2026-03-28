import React, {Suspense} from "react";
import {NuqsAdapter} from "nuqs/adapters/next";
import {FileSystemProvider} from "@/context/file-system-context";
import {SideBarProvider} from "@/context/side-bar-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>
    <NuqsAdapter>
      <FileSystemProvider>
        <SideBarProvider>
          {children}
        </SideBarProvider>
      </FileSystemProvider>
    </NuqsAdapter>
  </Suspense>
}