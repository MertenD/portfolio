"use client"

import { useState } from "react"
import { MousePointerClickIcon, ExternalLinkIcon, LayoutIcon, FileIcon, BotIcon, UserIcon, UsersIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export type SessionSummary = {
  sessionId: string
  firstSeen: string
  lastSeen: string
  eventCount: number
  chatMessageCount: number
}

export type TimelineItem =
  | { kind: "event"; id: string; type: string; name: string; url?: string; fileId?: string; createdAt: string }
  | { kind: "chat"; id: string; role: string; content: string; createdAt: string }

export type SessionData = {
  summary: SessionSummary
  timeline: TimelineItem[]
}

interface Props {
  sessions: SessionData[]
}

export function SessionsTab({ sessions }: Props) {
  const [selected, setSelected] = useState<SessionData | null>(sessions[0] ?? null)

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
        <UsersIcon className="w-8 h-8 opacity-30" />
        <p className="text-sm">No sessions yet.</p>
      </div>
    )
  }

  return (
    <div className="flex h-full overflow-hidden">
      <aside className="w-64 shrink-0 border-r border-border flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-border shrink-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {sessions.length} Session{sessions.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {sessions.map((s) => {
            const isSelected = selected?.summary.sessionId === s.summary.sessionId
            return (
              <button
                key={s.summary.sessionId}
                onClick={() => setSelected(s)}
                className={cn(
                  "w-full text-left px-4 py-3 border-b border-border/60 transition-colors",
                  isSelected ? "bg-muted" : "hover:bg-muted/40"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {formatDateTime(s.summary.lastSeen)}
                  </span>
                </div>
                <p className="text-[10px] font-mono text-muted-foreground/60 truncate mb-1.5">
                  {s.summary.sessionId.slice(0, 8)}…
                </p>
                <div className="flex gap-2 flex-wrap">
                  {s.summary.eventCount > 0 && (
                    <span className="text-[10px] bg-muted text-muted-foreground rounded-full px-1.5 py-0.5">
                      {s.summary.eventCount} events
                    </span>
                  )}
                  {s.summary.chatMessageCount > 0 && (
                    <span className="text-[10px] bg-primary/10 text-primary rounded-full px-1.5 py-0.5">
                      {s.summary.chatMessageCount} msgs
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </aside>

      <main className="flex-1 min-w-0 flex flex-col overflow-hidden bg-background">
        {selected ? (
          <>
            <div className="px-5 py-3 border-b border-border shrink-0 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium">
                  {formatDateTimeLong(selected.summary.firstSeen)}
                  {selected.summary.firstSeen !== selected.summary.lastSeen && (
                    <> — {formatDateTime(selected.summary.lastSeen)}</>
                  )}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground mt-0.5 truncate max-w-xs">
                  {selected.summary.sessionId}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {selected.summary.eventCount + selected.summary.chatMessageCount} items
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {selected.timeline.map((item) =>
                item.kind === "event" ? (
                  <EventItem key={item.id} item={item} />
                ) : (
                  <ChatItem key={item.id} item={item} />
                )
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            Select a session
          </div>
        )}
      </main>
    </div>
  )
}

function EventItem({ item }: { item: Extract<TimelineItem, { kind: "event" }> }) {
  const { icon, color } = eventMeta(item.type)
  return (
    <div className="flex items-start gap-3">
      <div className={cn("flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5", color)}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-foreground truncate">{item.name}</p>
        {item.url && (
          <p className="text-[10px] text-muted-foreground font-mono truncate">{item.url}</p>
        )}
        {item.fileId && (
          <p className="text-[10px] text-muted-foreground font-mono truncate">{item.fileId}</p>
        )}
      </div>
      <span className="text-[10px] font-mono text-muted-foreground shrink-0 mt-0.5">
        {formatTime(item.createdAt)}
      </span>
    </div>
  )
}

function ChatItem({ item }: { item: Extract<TimelineItem, { kind: "chat" }> }) {
  const isUser = item.role === "USER"
  return (
    <div className={cn("flex items-start gap-2.5", isUser && "flex-row-reverse")}>
      <div className={cn(
        "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5",
        isUser ? "bg-primary/20" : "bg-primary/10"
      )}>
        {isUser
          ? <UserIcon className="w-3.5 h-3.5 text-primary" />
          : <BotIcon className="w-3.5 h-3.5 text-primary" />
        }
      </div>
      <div className={cn("flex-1 min-w-0 flex flex-col gap-0.5", isUser && "items-end")}>
        <div className={cn(
          "inline-block px-3 py-1.5 rounded-lg text-xs max-w-[85%]",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted text-foreground rounded-bl-none"
        )}>
          <p className="line-clamp-4 whitespace-pre-wrap break-words">{item.content}</p>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">{formatTime(item.createdAt)}</span>
      </div>
    </div>
  )
}

function eventMeta(type: string) {
  switch (type) {
    case "FILE_OPEN":
      return { icon: <FileIcon className="w-3.5 h-3.5 text-blue-500" />, color: "bg-blue-500/10" }
    case "EXTERNAL_LINK":
      return { icon: <ExternalLinkIcon className="w-3.5 h-3.5 text-green-500" />, color: "bg-green-500/10" }
    case "SIDEBAR_TAB":
      return { icon: <LayoutIcon className="w-3.5 h-3.5 text-orange-500" />, color: "bg-orange-500/10" }
    case "BUTTON_CLICK":
      return { icon: <MousePointerClickIcon className="w-3.5 h-3.5 text-purple-500" />, color: "bg-purple-500/10" }
    default:
      return { icon: <MousePointerClickIcon className="w-3.5 h-3.5 text-muted-foreground" />, color: "bg-muted" }
  }
}

function formatDateTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("de", { day: "2-digit", month: "2-digit" }) +
    " · " + d.toLocaleTimeString("de", { hour: "2-digit", minute: "2-digit" })
}

function formatDateTimeLong(iso: string) {
  return new Date(iso).toLocaleString("de", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  })
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("de", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}
