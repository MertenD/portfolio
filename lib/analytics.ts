"use client"

import { EventType } from "@/lib/generated/prisma"

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
      }),
    }).catch(() => {})
  } catch {
    // analytics must never break the app
  }
}

export { EventType }
