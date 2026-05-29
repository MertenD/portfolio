"use client"

import { EventType } from "@/lib/generated/prisma"

const SESSION_KEY = "portfolio-session-id"

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr"
  let id = localStorage.getItem(SESSION_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(SESSION_KEY, id)
  }
  return id
}

export function trackEvent(
  type: EventType,
  name: string,
  opts?: { url?: string; fileId?: string }
) {
  try {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        name,
        url: opts?.url,
        fileId: opts?.fileId,
        sessionId: getSessionId(),
      }),
    }).catch(() => {})
  } catch {
    // analytics must never break the app
  }
}

export { EventType }
