import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { EventType } from "@/lib/generated/prisma"

export async function POST(req: Request) {
  try {
    const { type, name, url, fileId } = await req.json()

    if (!type || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    if (!Object.values(EventType).includes(type)) {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 })
    }

    const sessionId = await computeSessionId(req)

    await prisma.trackingEvent.create({
      data: { type, name, url: url ?? null, fileId: fileId ?? null, sessionId },
    })
  } catch {
    // silently swallow – analytics must never surface errors to the client
  }

  return NextResponse.json({ ok: true })
}

async function computeSessionId(req: Request): Promise<string> {
  const forwarded = req.headers.get("x-forwarded-for") ?? ""
  const rawIp = forwarded.split(",")[0].trim() || "unknown"
  const anonymizedIp = anonymizeIp(rawIp)
  const userAgent = req.headers.get("user-agent") ?? "unknown"
  const dailySalt = new Date().toISOString().slice(0, 10)

  const input = `${anonymizedIp}-${userAgent}-${dailySalt}`
  const encoded = new TextEncoder().encode(input)
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

function anonymizeIp(ip: string): string {
  if (ip.includes(":")) {
    const parts = ip.split(":")
    return [...parts.slice(0, 6), "0", "0"].join(":")
  }
  const parts = ip.split(".")
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.${parts[2]}.0`
  }
  return "unknown"
}
