"use client"

import { useEffect, useRef, useState } from "react"
import { SearchIcon, FileIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useFileSystem } from "@/context/file-system-context"
import { fileSystemContent } from "@/content/file-system-content"
import { getAllFiles } from "@/context/file-system-context-utils"
import searchIndex from "@/content/search-index.json"

const allFiles = getAllFiles(fileSystemContent)

type MatchKind = "name" | "keyword" | "content"

interface MatchResult {
  kind: MatchKind
  snippet?: string
  matchedKeyword?: string
}

function getMatch(
  file: { id: string; name: string; keywords?: string[] },
  q: string
): MatchResult | null {
  if (file.name.toLowerCase().includes(q)) return { kind: "name" }

  const matchedKeyword = file.keywords?.find((k) => k.toLowerCase().includes(q))
  if (matchedKeyword) return { kind: "keyword", matchedKeyword }

  const indexed = searchIndex[file.id as keyof typeof searchIndex]
  if (indexed) {
    const idx = indexed.indexOf(q)
    if (idx !== -1) {
      const start = Math.max(0, idx - 60)
      const end = Math.min(indexed.length, idx + q.length + 60)
      let snippet = indexed.slice(start, end).trim()
      if (start > 0) snippet = "…" + snippet
      if (end < indexed.length) snippet += "…"
      return { kind: "content", snippet }
    }
  }

  return null
}

function HighlightedSnippet({ text, query }: { text: string; query: string }) {
  const idx = text.indexOf(query)
  if (idx === -1) return <span>{text}</span>
  return (
    <span>
      {text.slice(0, idx)}
      <span className="bg-primary/20 text-foreground rounded-sm px-0.5">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </span>
  )
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
        .map(({ file, path }) => ({ file, path, match: getMatch(file, q) }))
        .filter((r): r is typeof r & { match: MatchResult } => r.match !== null)
        .sort((a, b) => kindOrder[a.match.kind] - kindOrder[b.match.kind])
    : []

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="relative">
        <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search files and content..."
          className="pl-8 h-8 text-xs"
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
          {results.map(({ file, path, match }) => (
            <li key={file.id}>
              <button
                onClick={() => openFileById(file.id)}
                className="w-full flex items-start gap-2 rounded px-2 py-1.5 text-left text-xs hover:bg-ide-hover hover:text-accent-foreground transition-colors"
              >
                <FileIcon className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                <span className="flex flex-col min-w-0 gap-0.5">
                  <span className="text-foreground truncate">{file.name}</span>
                  {path.length > 0 && (
                    <span className="text-muted-foreground/60 truncate">{path.join(" / ")}</span>
                  )}
                  {match.kind === "content" && match.snippet && (
                    <span className="text-muted-foreground/70 leading-relaxed line-clamp-2 whitespace-normal">
                      <HighlightedSnippet text={match.snippet} query={q} />
                    </span>
                  )}
                  {match.kind === "keyword" && match.matchedKeyword && (
                    <span className="text-muted-foreground/50 italic">
                      keyword: {match.matchedKeyword}
                    </span>
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
