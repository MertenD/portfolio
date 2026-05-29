"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { EventType } from "@/lib/generated/prisma"
import { MetricsTab } from "./metrics-tab"
import { ChatTab } from "./chat-tab"
import { SessionsTab } from "./sessions-tab"
import type { SessionData } from "./sessions-tab"
import { cn } from "@/lib/utils"
import { BarChart2Icon, MessageSquareIcon, UsersIcon } from "lucide-react"

export type SeriesMeta = { name: string; total: number; type: EventType }

export type ChatMessage = {
  id: string
  role: string
  content: string
  createdAt: string
}

export type ChatSession = {
  id: string
  sessionId: string
  createdAt: string
  messages: ChatMessage[]
}

type Tab = "metrics" | "chat" | "sessions"

interface Props {
  days: number
  chartData: Record<string, string | number>[]
  series: SeriesMeta[]
  chatSessions: ChatSession[]
  sessionData: SessionData[]
}

export function AdminDashboard({ days, chartData, series, chatSessions, sessionData }: Props) {
  const [tab, setTab] = useState<Tab>("metrics")
  const router = useRouter()

  function setDays(d: number) {
    router.push(`/admin?days=${d}`)
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Portfolio</span>
          <span className="text-muted-foreground/40">/</span>
          <h1 className="text-sm font-semibold">Analytics</h1>
        </div>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          {([7, 30, 90] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                days === d
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {d}d
            </button>
          ))}
        </div>
      </header>

      {/* Tabs */}
      <div className="flex items-center gap-1 px-6 border-b border-border shrink-0">
        <TabButton active={tab === "metrics"} onClick={() => setTab("metrics")} icon={<BarChart2Icon className="w-3.5 h-3.5" />}>
          Metrics
        </TabButton>
        <TabButton active={tab === "chat"} onClick={() => setTab("chat")} icon={<MessageSquareIcon className="w-3.5 h-3.5" />}>
          Chat Sessions
          {chatSessions.length > 0 && (
            <span className="ml-1.5 text-[10px] bg-muted text-muted-foreground rounded-full px-1.5 py-0.5">
              {chatSessions.length}
            </span>
          )}
        </TabButton>
        <TabButton active={tab === "sessions"} onClick={() => setTab("sessions")} icon={<UsersIcon className="w-3.5 h-3.5" />}>
          Sessions
          {sessionData.length > 0 && (
            <span className="ml-1.5 text-[10px] bg-muted text-muted-foreground rounded-full px-1.5 py-0.5">
              {sessionData.length}
            </span>
          )}
        </TabButton>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {tab === "metrics" && <MetricsTab chartData={chartData} series={series} days={days} />}
        {tab === "chat" && <ChatTab sessions={chatSessions} />}
        {tab === "sessions" && <SessionsTab sessions={sessionData} />}
      </div>
    </div>
  )
}

function TabButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors",
        active
          ? "border-primary text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
      )}
    >
      {icon}
      {children}
    </button>
  )
}
