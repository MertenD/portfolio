"use client"

import {useSideBar} from "@/context/side-bar-context";

export default function SideBar() {

  const { currentTabComponent } = useSideBar()

  return <div className="p-2 h-full overflow-hidden flex w-full flex-col z-40 bg-popover border-r border-border">
    { currentTabComponent }
  </div>
}