"use client"

import { Terminal } from "lucide-react"
import pkg from "@/package.json"

export function AppHeader() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center w-full h-10 px-0 bg-background border-b border-border">
      <div className="flex items-center h-full">
        <div className="px-4 text-primary font-mono text-sm font-bold opacity-80 flex items-center gap-2">
          <Terminal className="w-4 h-4 shrink-0" />
          Merten.tech
        </div>
      </div>

      <div className="px-4 h-full flex items-center">
        <span className="font-mono text-xs text-muted-foreground select-none">v{pkg.version}</span>
      </div>
    </nav>
  )
}
