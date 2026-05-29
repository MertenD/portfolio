import { prisma } from "@/lib/prisma"
import { EventType } from "@/lib/generated/prisma"
import { AdminDashboard } from "./dashboard"

export const dynamic = "force-dynamic"

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>
}) {
  const { days: daysParam } = await searchParams
  const days = Number(daysParam ?? 30)
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  const [rawEvents, chatSessions] = await Promise.all([
    prisma.trackingEvent.findMany({
      where: { createdAt: { gte: since } },
      orderBy: { createdAt: "asc" },
      select: { createdAt: true, type: true, name: true },
    }),
    prisma.chatSession.findMany({
      where: { createdAt: { gte: since } },
      include: { messages: { orderBy: { createdAt: "asc" } } },
      orderBy: { createdAt: "desc" },
    }),
  ])

  // Build daily buckets
  const buckets = new Map<string, Map<string, number>>()
  const allNames = new Set<string>()

  for (const e of rawEvents) {
    const date = e.createdAt.toISOString().slice(0, 10)
    if (!buckets.has(date)) buckets.set(date, new Map())
    const bucket = buckets.get(date)!
    bucket.set(e.name, (bucket.get(e.name) ?? 0) + 1)
    allNames.add(e.name)
  }

  // Fill every date in range
  const dateRange: string[] = []
  const cursor = new Date(since)
  cursor.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  while (cursor <= today) {
    dateRange.push(cursor.toISOString().slice(0, 10))
    cursor.setDate(cursor.getDate() + 1)
  }

  const chartData = dateRange.map((date) => {
    const row: Record<string, string | number> = { date }
    const b = buckets.get(date)
    for (const name of allNames) {
      row[name] = b?.get(name) ?? 0
    }
    return row
  })

  // Series metadata (name → total + type)
  const seriesMap = new Map<string, { total: number; type: EventType }>()
  for (const e of rawEvents) {
    const prev = seriesMap.get(e.name)
    seriesMap.set(e.name, {
      total: (prev?.total ?? 0) + 1,
      type: e.type as EventType,
    })
  }
  const series = [...seriesMap.entries()]
    .map(([name, { total, type }]) => ({ name, total, type }))
    .sort((a, b) => b.total - a.total)

  // Serialize dates for client
  const serializedSessions = chatSessions.map((s) => ({
    id: s.id,
    sessionId: s.sessionId,
    createdAt: s.createdAt.toISOString(),
    messages: s.messages.map((m) => ({
      id: m.id,
      role: m.role,
      content: m.content,
      createdAt: m.createdAt.toISOString(),
    })),
  }))

  return (
    <AdminDashboard
      days={days}
      chartData={chartData}
      series={series}
      chatSessions={serializedSessions}
    />
  )
}
