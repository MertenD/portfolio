'use client'

import * as React from 'react'
import { TwitterPicker, type ColorResult } from 'react-color'

import { cn } from '@/lib/utils'

type Props = {
  value: string
  onChangeAction: (hex: string) => void
  className?: string
  colors?: string[]
}

const DEFAULT_COLORS = [
  '#ffb782',
  '#b0d09c',
  '#00658e',
  '#904900',
  '#ae611b',
  '#544338',
  '#919191',
  '#ffffff',
  '#000000',
]

export function ThemedTwitterPicker({
  value,
  onChangeAction,
  className,
  colors = DEFAULT_COLORS,
}: Props) {
  return (
    <div
      className={cn(
        // Wrapper im shadcn-Stil
        'rounded-md border',
        // react-color nutzt inline styles; wir lassen unten nur das Nötigste sichtbar
        '[&_.twitter-picker]:bg-transparent!',

        // Farbanpassung für "#"-Prefix-Block (Layout unangetastet)
        '[&_.twitter-picker>div:last-child>div:nth-last-child(3)]:bg-transparent! dark:[&_.twitter-picker>div:last-child>div:nth-last-child(3)]:bg-input/30!',
        '[&_.twitter-picker>div:last-child>div:nth-last-child(3)]:text-muted-foreground! [&_.twitter-picker>div:last-child>div:nth-last-child(3)]:border-input! [&_.twitter-picker>div:last-child>div:nth-last-child(3)]:shadow-none!',

        // Hex-Input: nur Farben + Border/Shadow, kein Layout
        '[&_.twitter-picker_input]:bg-transparent! dark:[&_.twitter-picker_input]:bg-input/30!',
        '[&_.twitter-picker_input]:text-foreground! [&_.twitter-picker_input]:border-input! [&_.twitter-picker_input]:shadow-none!',
        // react-color setzt border=0 + inset box-shadow als Border; wir nutzen echte Border via box-shadow entfernen
        '[&_.twitter-picker_input]:focus-visible:border-ring! [&_.twitter-picker_input]:focus-visible:outline-none! [&_.twitter-picker_input]:focus-visible:ring-[3px]! [&_.twitter-picker_input]:focus-visible:ring-ring/50!',

        // Swatches
        '[&_.twitter-picker>div:first-child>span>div]:rounded-md! [&_.twitter-picker>div:first-child>span>div]:shadow-none!',
        className,
      )}
    >
      <TwitterPicker
        color={value}
        colors={colors}
        onChangeComplete={(c: ColorResult) => onChangeAction(c.hex)}
        triangle="hide"
        className="twitter-picker"
      />
    </div>
  )
}
