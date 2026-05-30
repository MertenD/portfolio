"use client"

import {Button} from "@/components/ui/button";

export type Lang = "en" | "de"

interface LangToggleProps {
  lang: Lang
  onChange: (lang: Lang) => void
}

export function LangToggle({ lang, onChange }: LangToggleProps) {
  return (
    <div className="flex gap-1">
      <Button
        onClick={() => onChange("en")}
        variant={lang === "en" ? "default" : "outline"}
        className={`px-2.5 py-1 rounded text-base transition-colors`}
        title="English"
      >
        🇬🇧
      </Button>
      <Button
        onClick={() => onChange("de")}
        variant={lang === "de" ? "default" : "outline"}
        className={`px-2.5 py-1 rounded text-base transition-colors`}
        title="Deutsch"
      >
        🇩🇪
      </Button>
    </div>
  )
}
