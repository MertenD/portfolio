'use client'

import { useCallback, useEffect } from 'react'
import { usePanelRef } from 'react-resizable-panels'

export function useResizableSidebarPanel(isOpen: boolean) {
  const sidebarRef = usePanelRef()

  const expandSidebar = useCallback(() => {
    sidebarRef.current?.expand()
  }, [sidebarRef])

  const collapseSidebar = useCallback(() => {
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

