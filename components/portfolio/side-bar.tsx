"use client"

import {FileExplorer} from "@/components/portfolio/file-explorer";
import {useSideBar} from "@/context/side-bar-context";
import {cn} from "@/lib/utils";

export default function SideBar() {
  const { isOpen } = useSideBar()

  return <div className={cn(
    "h-full overflow-hidden flex w-full flex-col z-40 bg-popover border-r border-border transition-all duration-300",
    isOpen ? "w-full" : "w-0"
  )}>
    <FileExplorer />
  </div>
}