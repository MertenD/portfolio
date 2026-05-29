"use client"

import { useState, useEffect, useRef } from "react"
import { BotIcon, UserIcon, MessagesSquareIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ChatSession, ChatMessage } from "./dashboard"

interface Props {
  sessions: ChatSession[]
}

export function ChatTab({ sessions }: Props) {
  const [selected, setSelected] = useState<ChatSession | null>(sessions[0] ?? null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [selected])

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
        <MessagesSquareIcon className="w-8 h-8 opacity-30" />
        <p className="text-sm">No chat sessions yet.</p>
      </div>
    )
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* Session list */}
      <aside className="w-64 shrink-0 border-r border-border flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-border shrink-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {sessions.length} Session{sessions.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {sessions.map((s) => {
            const firstUserMsg = s.messages.find((m) => m.role === "USER")
            const isSelected = selected?.id === s.id
            return (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                className={cn(
                  "w-full text-left px-4 py-3 border-b border-border/60 transition-colors",
                  isSelected ? "bg-muted" : "hover:bg-muted/40"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {formatDateTime(s.createdAt)}
                  </span>
                  <span className="text-[10px] bg-muted text-muted-foreground rounded-full px-1.5 py-0.5">
                    {s.messages.length}
                  </span>
                </div>
                {firstUserMsg && (
                  <p className="text-xs text-foreground truncate leading-relaxed">
                    {firstUserMsg.content}
                  </p>
                )}
              </button>
            )
          })}
        </div>
      </aside>

      {/* Conversation */}
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden bg-background">
        {selected ? (
          <>
            <div className="px-5 py-3 border-b border-border shrink-0 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium">{formatDateTimeLong(selected.createdAt)}</p>
                <p className="text-[10px] font-mono text-muted-foreground mt-0.5 truncate max-w-xs">
                  {selected.sessionId}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {selected.messages.length} messages
              </span>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4">
              {selected.messages.map((msg) =>
                msg.role === "USER" ? (
                  <UserBubble key={msg.id} message={msg} />
                ) : (
                  <AssistantBubble key={msg.id} message={msg} />
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

function AssistantBubble({ message }: { message: ChatMessage }) {
  return (
    <div className="flex gap-2 justify-start">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
        <BotIcon className="w-3.5 h-3.5 text-primary" />
      </div>
      <div className="flex flex-col gap-1 max-w-[75%]">
        <div className="px-3 py-2 rounded-lg text-sm bg-muted text-foreground rounded-bl-none whitespace-pre-wrap break-words">
          {message.content}
        </div>
        <span className="text-[10px] text-muted-foreground font-mono pl-1">
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  )
}

function UserBubble({ message }: { message: ChatMessage }) {
  return (
    <div className="flex gap-2 justify-end">
      <div className="flex flex-col gap-1 items-end max-w-[75%]">
        <div className="px-3 py-2 rounded-lg text-sm bg-primary text-primary-foreground rounded-br-none whitespace-pre-wrap break-words">
          {message.content}
        </div>
        <span className="text-[10px] text-muted-foreground font-mono pr-1">
          {formatTime(message.createdAt)}
        </span>
      </div>
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
        <UserIcon className="w-3.5 h-3.5 text-primary" />
      </div>
    </div>
  )
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
  return new Date(iso).toLocaleTimeString("de", { hour: "2-digit", minute: "2-digit" })
}
