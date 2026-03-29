"use client"

import { Search, Settings, Terminal } from "lucide-react"

export function AppHeader() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center w-full h-10 px-0 bg-background border-b border-border">
      <div className="flex items-center h-full">
        <div className="px-4 text-primary font-mono text-sm font-bold opacity-80 flex items-center gap-2">
          <Terminal className="w-4 h-4 shrink-0" />
          Merten.tech
        </div>
      </div>
    </nav>
  )
}
