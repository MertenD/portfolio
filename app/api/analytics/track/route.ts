import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { EventType } from "@/lib/generated/prisma"

export async function POST(req: Request) {
  try {
    const { type, name, url, fileId, sessionId } = await req.json()

    if (!type || !name || !sessionId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    if (!Object.values(EventType).includes(type)) {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 })
    }

    await prisma.trackingEvent.create({
      data: { type, name, url: url ?? null, fileId: fileId ?? null, sessionId },
    })
  } catch {
    // silently swallow – analytics must never surface errors to the client
  }

  return NextResponse.json({ ok: true })
}
