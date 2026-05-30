import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { sessionId, policyVersion } = await req.json()
    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 })
    }
    await prisma.chatSession.upsert({
      where: { sessionId },
      create: { sessionId, policyVersion: policyVersion ?? "unknown", consentGivenAt: new Date() },
      update: { policyVersion: policyVersion ?? "unknown", consentGivenAt: new Date() },
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true })
  }
}
