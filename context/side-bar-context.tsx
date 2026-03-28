"use client"

import React from "react";

interface SideBarContextType {
  isOpen: boolean
  currentTab: string | null
  handleTabClick: (id: string) => void
}

const SideBarContext = React.createContext<SideBarContextType | undefined>(undefined)

export function SideBarProvider({ children }: { children: React.ReactNode }) {
  const [currentTab, setCurrentTab] = React.useState<string | null>("fileSystem")

  const handleTabClick = (id: string) => {
    setCurrentTab(prev => prev === id ? null : id)
  }

  const isOpen = currentTab !== null

  return <SideBarContext.Provider value={{ isOpen, currentTab, handleTabClick }}>
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