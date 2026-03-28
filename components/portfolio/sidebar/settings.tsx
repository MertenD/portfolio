"use client"

import React from "react";
import { useTheme } from "next-themes";
import { ComputerIcon, MoonIcon, SunIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ThemeChoice = "system" | "light" | "dark"

const themeOptions: Array<{
  value: ThemeChoice
  label: string
  Icon: React.ComponentType<{ className?: string }>
}> = [
  { value: "system", label: "System", Icon: ComputerIcon },
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
]

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const value = (theme ?? "dark") as ThemeChoice

  return (
    <aside className="h-full overflow-y-auto flex w-full flex-col z-40 bg-popover">
      <div className="px-2 py-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex justify-between items-center">
        <span>Settings</span>
      </div>

      <div className="pb-2 flex flex-col gap-3">
        <div className="p-2 rounded-md flex items-center justify-between gap-2 text-xs font-mono">
          <span className="select-none">Theme</span>

          <Select value={value} onValueChange={(v) => setTheme(v as ThemeChoice)}>
            <SelectTrigger size="sm" className="w-[160px] bg-surface-container-lowest border-0">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              {themeOptions.map(({ value, label, Icon }) => (
                <SelectItem key={value} value={value}>
                  <span className="flex items-center gap-2">
                    <Icon className="size-4 text-muted-foreground" />
                    {label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </aside>
  )
}