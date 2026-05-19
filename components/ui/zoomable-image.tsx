"use client"

import { useState } from "react"
import Image from "next/image"
import { ZoomInIcon } from "lucide-react"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

interface ZoomableImageProps {
  src: string
  alt: string
  height?: number
}

export function ZoomableImage({ src, alt, height = 280 }: ZoomableImageProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className="group flex justify-center bg-muted/30 rounded-lg p-4 relative cursor-zoom-in"
        style={{ height }}
        onClick={() => setOpen(true)}
      >
        <Image src={src} alt={alt} fill className="object-contain p-2" />
        <div className="absolute inset-0 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          <ZoomInIcon className="w-8 h-8 text-white drop-shadow" />
        </div>
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src }]}
        carousel={{ finite: true }}
        controller={{ closeOnBackdropClick: true }}
        styles={{ container: { backgroundColor: "rgba(0,0,0,0.85)" } }}
      />
    </>
  )
}
