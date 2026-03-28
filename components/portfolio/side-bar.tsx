"use client"

import {FileExplorer} from "@/components/portfolio/file-explorer";

export default function SideBar() {
  return <div className="h-full overflow-hidden flex w-full flex-col z-40 bg-popover border-r border-border">
    <FileExplorer />
  </div>
}