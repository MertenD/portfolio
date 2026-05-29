"use client"

import { useState, useMemo } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { EventType } from "@/lib/generated/prisma"
import { cn } from "@/lib/utils"
import type { SeriesMeta } from "./dashboard"

const PALETTE = [
  "#6366f1", "#f59e0b", "#10b981", "#ef4444",
  "#3b82f6", "#ec4899", "#14b8a6", "#f97316",
  "#8b5cf6", "#84cc16", "#0ea5e9", "#a3e635",
]

const TYPE_LABEL: Record<EventType, string> = {
  FILE_OPEN: "File Opens",
  EXTERNAL_LINK: "External Links",
  SIDEBAR_TAB: "Sidebar",
  BUTTON_CLICK: "Buttons",
}

interface Props {
  chartData: Record<string, string | number>[]
  series: SeriesMeta[]
  days: number
}

export function MetricsTab({ chartData, series, days }: Props) {
  const [hidden, setHidden] = useState<Set<string>>(new Set())

  const colorMap = useMemo(() => {
    const m = new Map<string, string>()
    series.forEach((s, i) => m.set(s.name, PALETTE[i % PALETTE.length]))
    return m
  }, [series])

  const typeMap = useMemo(() => {
    const m = new Map<string, EventType>()
    series.forEach((s) => m.set(s.name, s.type))
    return m
  }, [series])

  const visibleSeries = series.filter((s) => !hidden.has(s.name))

  function toggle(name: string) {
    setHidden((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const totalEvents = series.reduce((s, e) => s + e.total, 0)

  // X-axis tick interval based on range
  const tickInterval = days <= 7 ? 0 : days <= 30 ? 3 : 6

  // Format x-axis dates
  const formattedData = chartData.map((row) => ({
    ...row,
    dateLabel: formatDateShort(row.date as string),
  }))

  if (series.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
        <p className="text-sm">No events in the last {days} days.</p>
      </div>
    )
  }

  // Group series by type
  const grouped = Object.entries(
    series.reduce<Record<string, SeriesMeta[]>>((acc, s) => {
      if (!acc[s.type]) acc[s.type] = []
      acc[s.type].push(s)
      return acc
    }, {})
  )

  return (
    <div className="flex flex-col h-full overflow-y-auto p-6 gap-6">
      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Total Events" value={totalEvents} />
        <StatCard
          label="File Opens"
          value={series.filter((s) => s.type === EventType.FILE_OPEN).reduce((a, s) => a + s.total, 0)}
        />
        <StatCard
          label="Link Clicks"
          value={series.filter((s) => s.type === EventType.EXTERNAL_LINK).reduce((a, s) => a + s.total, 0)}
        />
        <StatCard
          label="Sidebar Clicks"
          value={series.filter((s) => s.type === EventType.SIDEBAR_TAB).reduce((a, s) => a + s.total, 0)}
        />
      </div>

      {/* Chart */}
      <div className="rounded-lg border border-border bg-card p-4">
        <p className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wider">Events over time</p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={formattedData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.12)" />
            <XAxis
              dataKey="dateLabel"
              tick={{ fill: "#888", fontSize: 10 }}
              interval={tickInterval}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#888", fontSize: 10 }}
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<ChartTooltip colorMap={colorMap} typeMap={typeMap} />} />
            {visibleSeries.map((s) => (
              <Line
                key={s.name}
                type="monotone"
                dataKey={s.name}
                stroke={colorMap.get(s.name)!}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Filter chips grouped by type */}
      <div className="space-y-4">
        {grouped.map(([type, typeSeries]) => (
          <div key={type}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              {TYPE_LABEL[type as EventType] ?? type}
            </p>
            <div className="flex flex-wrap gap-2">
              {[...typeSeries].sort((a, b) => a.name.localeCompare(b.name)).map((s) => {
                const color = colorMap.get(s.name)!
                const isHidden = hidden.has(s.name)
                return (
                  <button
                    key={s.name}
                    onClick={() => toggle(s.name)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all",
                      isHidden
                        ? "border-border bg-transparent text-muted-foreground opacity-50"
                        : "border-border bg-card text-foreground"
                    )}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: isHidden ? "#888" : color }}
                    />
                    <span className="font-mono">{s.name}</span>
                    <span className={cn("text-[10px]", isHidden ? "text-muted-foreground" : "text-muted-foreground")}>
                      {s.total}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChartTooltip({
  active,
  payload,
  label,
  colorMap,
  typeMap,
}: {
  active?: boolean
  payload?: { dataKey: string; value: number }[]
  label?: string
  colorMap: Map<string, string>
  typeMap: Map<string, EventType>
}) {
  if (!active || !payload?.length) return null
  const entries = payload.filter((p) => p.value > 0)
  if (!entries.length) return null

  return (
    <div
      className="rounded-lg border border-border bg-popover text-foreground shadow-md"
      style={{ fontSize: "11px", padding: "8px 12px", minWidth: "180px" }}
    >
      <p className="text-muted-foreground mb-2 font-medium">{label}</p>
      <div className="space-y-1.5">
        {entries.map((entry) => {
          const type = typeMap.get(entry.dataKey)
          const color = colorMap.get(entry.dataKey) ?? "#888"
          return (
            <div key={entry.dataKey} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
              <span className="flex-1 font-mono truncate max-w-[140px]">{entry.dataKey}</span>
              {type && (
                <span className="text-muted-foreground shrink-0">
                  {TYPE_LABEL[type]}
                </span>
              )}
              <span className="font-semibold tabular-nums shrink-0">{entry.value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold tabular-nums">{value}</p>
    </div>
  )
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("en", { month: "short", day: "numeric" })
}
