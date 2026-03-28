"use client"

import React from "react";

interface SideBarContextType {
  isOpen: boolean
  currentTab: string | null
  handleTabClick: (id: string) => void
  setOnTabClicked: (cb: (() => void) | null) => void
  close: () => void
  openLastTab: () => void
}

const SideBarContext = React.createContext<SideBarContextType | undefined>(undefined)

export function SideBarProvider({ children }: { children: React.ReactNode }) {
  const [currentTab, setCurrentTab] = React.useState<string | null>("fileSystem")
  const [lastTab, setlastTab] = React.useState<string | null>(null)
  const [onTabClicked, setOnTabClicked] = React.useState<(() => void) | null>(null)
  const isOpen = currentTab !== null

  const handleTabClick = (id: string) => {
    onTabClicked?.()
    setlastTab(id)
    setCurrentTab(prev => prev === id ? null : id)
  }

  const close = () => {
    if (currentTab) {
      setlastTab(currentTab)
    }
    setCurrentTab(null)
  }

  const openLastTab = () => {
    if (lastTab) {
      setCurrentTab(lastTab)
    }
  }

  return <SideBarContext.Provider value={{ isOpen, currentTab, handleTabClick, close, openLastTab, setOnTabClicked }}>
    {children}
  </SideBarContext.Provider>
}

export function useSideBar() {
  const context = React.useContext(SideBarContext)
  if (!context) {
    throw new Error('useSideBar must be used within a <SideBarProvider />')
  }
  return context
}