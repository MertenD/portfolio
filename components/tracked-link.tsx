"use client"

import React, { forwardRef } from "react"
import { trackEvent, EventType } from "@/lib/analytics"
import Link from "next/dist/client/link";

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  trackingName: string
  trackingType?: EventType
  children: React.ReactNode
}

export const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  function TrackedLink(
    { href, trackingName, trackingType = EventType.EXTERNAL_LINK, children, onClick, ...props },
    ref
  ) {
    return (
      <Link
        ref={ref}
        href={href}
        onClick={(e) => {
          trackEvent(trackingType, trackingName, { url: href })
          onClick?.(e)
        }}
        {...props}
      >
        {children}
      </Link>
    )
  }
)
