'use client'

import {useCallback, useEffect, useState} from 'react'
import { usePanelRef } from 'react-resizable-panels'

export function useResizableSidebarPanel(isOpen: boolean) {
  const DEFAULT_SIDEBAR_WIDTH_PX = 250
  const sidebarRef = usePanelRef()
  const [lastWidth, setLastWidth] = useState<number | undefined>(undefined)

  const expandSidebarPanel = useCallback(() => {
    const newWidth = Math.max(lastWidth || DEFAULT_SIDEBAR_WIDTH_PX, DEFAULT_SIDEBAR_WIDTH_PX)
    sidebarRef.current?.resize(newWidth)
  }, [sidebarRef, lastWidth])

  const collapseSidebarPanel = useCallback(() => {
    sidebarRef.current?.collapse()
  }, [sidebarRef])

  const saveLastWidth = useCallback(() => {
    const lastWidthInPixels = sidebarRef.current?.getSize().inPixels
    if (lastWidthInPixels !== 0) {
      setLastWidth(lastWidthInPixels)
    }
  }, [sidebarRef])

  useEffect(() => {
    if (isOpen) {
      expandSidebarPanel()
    } else {
      collapseSidebarPanel()
    }
  }, [isOpen, expandSidebarPanel, collapseSidebarPanel])

  return {
    sidebarRef,
    saveLastWidth
  }
}

