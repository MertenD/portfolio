'use client'

import {useCallback, useEffect, useState} from 'react'
import { usePanelRef } from 'react-resizable-panels'

export function useResizableSidebarPanel(isOpen: boolean) {
  const DEFAULT_SIDEBAR_WIDTH_PX = 250
  const sidebarRef = usePanelRef()
  const [lastWidth, setLastWidth] = useState<number | undefined>(undefined)

  const expandSidebar = useCallback(() => {
    const newWidth = Math.max(lastWidth || DEFAULT_SIDEBAR_WIDTH_PX, DEFAULT_SIDEBAR_WIDTH_PX)
    sidebarRef.current?.resize(newWidth)
  }, [sidebarRef, lastWidth])

  const collapseSidebar = useCallback(() => {
    const lastWidthInPixels = sidebarRef.current?.getSize().inPixels
    if (lastWidthInPixels !== 0) {
      setLastWidth(lastWidthInPixels)
    }
    sidebarRef.current?.collapse()
  }, [sidebarRef])

  useEffect(() => {
    if (isOpen) {
      expandSidebar()
    } else {
      collapseSidebar()
    }
  }, [isOpen, expandSidebar, collapseSidebar])

  return {
    sidebarRef,
    expandSidebar,
    collapseSidebar,
  }
}

