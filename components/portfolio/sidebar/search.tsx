"use client"

import { useEffect, useRef, useState } from "react"
import { SearchIcon, FileIcon } from "lucide-react"
import { useFileSystem } from "@/context/file-system-context"
import { fileSystemContent } from "@/content/file-system-content"
import { getAllFiles } from "@/context/file-system-context-utils"

const allFiles = getAllFiles(fileSystemContent)

type MatchKind = "name" | "keyword" | "content"

function getMatchKind(file: { name: string; keywords?: string[]; searchableText?: string }, q: string): MatchKind | null {
  if (file.name.toLowerCase().includes(q)) return "name"
  if (file.keywords?.some((k) => k.toLowerCase().includes(q))) return "keyword"
  if (file.searchableText?.toLowerCase().includes(q)) return "content"
  return null
}

const kindOrder: Record<MatchKind, number> = { name: 0, keyword: 1, content: 2 }

export default function Search() {
  const { openFileById } = useFileSystem()
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const q = query.trim().toLowerCase()

  const results = q
    ? allFiles
        .map(({ file, path }) => ({ file, path, kind: getMatchKind(file, q) }))
        .filter((r): r is typeof r & { kind: MatchKind } => r.kind !== null)
        .sort((a, b) => kindOrder[a.kind] - kindOrder[b.kind])
    : []

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center bg-popover rounded border border-border text-muted-foreground text-xs px-2 py-1.5 gap-2 focus-within:border-ring">
        <SearchIcon className="w-3.5 h-3.5 shrink-0" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search files and content..."
          className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground/60 text-foreground"
        />
      </div>

      {q === "" && (
        <p className="text-xs text-muted-foreground/60 px-1">Type to search files and content</p>
      )}

      {q !== "" && results.length === 0 && (
        <p className="text-xs text-muted-foreground/60 px-1">No results for &quot;{query}&quot;</p>
      )}

      {results.length > 0 && (
        <ul className="flex flex-col gap-0.5">
          {results.map(({ file, path }) => (
            <li key={file.id}>
              <button
                onClick={() => openFileById(file.id)}
                className="w-full flex items-start gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <FileIcon className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                <span className="flex flex-col min-w-0">
                  <span className="text-foreground truncate">{file.name}</span>
                  {path.length > 0 && (
                    <span className="text-muted-foreground/60 truncate">{path.join(" / ")}</span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
