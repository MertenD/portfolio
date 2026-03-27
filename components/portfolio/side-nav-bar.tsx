"use client"

import {BotMessageSquareIcon, FolderOpenIcon, SearchIcon} from "lucide-react"

const sideItems = [
  { icon: FolderOpenIcon, label: "Project Explorer", active: true },
  { icon: SearchIcon, label: "Search", active: false },
  { icon: BotMessageSquareIcon, label: "Chat", active: false },
]

export function SideNavBar() {
  return (
    <aside className="fixed left-0 top-10 bottom-0 flex flex-col items-center py-4 w-12 z-40 bg-[#1e1f22] border-r border-border">
      <div className="flex flex-col gap-6 items-center w-full">
        {sideItems.map((item) => (
          <button
            key={item.label}
            className={`w-full py-2 flex justify-center group relative transition-all ${
              item.active
                ? "text-primary border-l-2 border-primary bg-[#2b2d30]"
                : "text-[#6d6d6d] opacity-70 hover:text-foreground hover:bg-[#2b2d30]"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="absolute left-14 bg-[#323232] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}
