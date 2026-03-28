"use client"

import { Search, Settings, Terminal } from "lucide-react"

export function AppHeader() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center w-full h-10 px-0 bg-background border-b border-border">
      <div className="flex items-center h-full">
        <div className="px-4 text-primary font-mono text-sm font-bold opacity-80 flex items-center gap-2">
          <Terminal className="w-3 h-3 shrink-0" />
          Mertens Portfolio
        </div>
      </div>
      <div className="flex items-center px-4 gap-4">
        <div className="hidden md:flex items-center bg-popover px-2 py-0.5 rounded border border-border text-muted-foreground text-xs">
          <Search className="w-3.5 h-3.5 mr-2" />
          <span>Search...</span>
          <span className="ml-4 opacity-50">Ctrl+Shift+A</span>
        </div>
        <Settings className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
      </div>
    </nav>
  )
}
