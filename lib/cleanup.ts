import { PrismaLibSql } from "@prisma/adapter-libsql"
import { PrismaClient } from "@/lib/generated/prisma"

const ANALYTICS_RETENTION_DAYS = 365
const CHAT_MESSAGE_RETENTION_DAYS = 90
const CHAT_SESSION_RETENTION_DAYS = 365 * 3  // consent evidence: 3 years

function daysAgo(days: number): Date {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d
}

export async function runCleanup(): Promise<void> {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error("DATABASE_URL is not set")
  const adapter = new PrismaLibSql({ url })
  const prisma = new PrismaClient({ adapter })

  try {
    // 1. Analytics events: delete after 12 months
    const deletedEvents = await prisma.trackingEvent.deleteMany({
      where: { createdAt: { lt: daysAgo(ANALYTICS_RETENTION_DAYS) } },
    })
    console.log(`[cleanup] Deleted ${deletedEvents.count} analytics events (>${ANALYTICS_RETENTION_DAYS}d)`)

    // 2. Chat messages: delete after 90 days, but keep ChatSession as consent evidence
    const oldSessions = await prisma.chatSession.findMany({
      where: { createdAt: { lt: daysAgo(CHAT_MESSAGE_RETENTION_DAYS) } },
      select: { sessionId: true },
    })
    if (oldSessions.length > 0) {
      const ids = oldSessions.map((s) => s.sessionId)
      const deletedMessages = await prisma.chatMessage.deleteMany({
        where: { sessionId: { in: ids } },
      })
      console.log(`[cleanup] Deleted ${deletedMessages.count} chat messages (>${CHAT_MESSAGE_RETENTION_DAYS}d), sessions retained as consent evidence`)
    } else {
      console.log(`[cleanup] No chat messages to delete (>${CHAT_MESSAGE_RETENTION_DAYS}d)`)
    }

    // 3. ChatSession skeletons: delete after 3 years (consent evidence period expired)
    const deletedSessions = await prisma.chatSession.deleteMany({
      where: { createdAt: { lt: daysAgo(CHAT_SESSION_RETENTION_DAYS) } },
    })
    console.log(`[cleanup] Deleted ${deletedSessions.count} chat sessions (>${CHAT_SESSION_RETENTION_DAYS}d)`)
  } finally {
    await prisma.$disconnect()
  }
}
