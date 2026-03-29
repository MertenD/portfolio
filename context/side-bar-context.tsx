"use client"

import React, {ForwardRefExoticComponent, JSX, RefAttributes} from "react";
import {LucideProps} from "lucide-react";
import {navTabsBottom, navTabsTop} from "@/content/side-nav-content";
import {MOBILE_BREAKPOINT, useIsMobile} from "@/hooks/use-mobile";

export type Tab = {
  id: string
  label: string
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  sideBarComponent: JSX.Element
}

export type TabLink = Omit<Tab, "sideBarComponent"> & { href: string }

interface SideBarContextType {
  isOpen: boolean
  currentTabId: string | null
  currentTabComponent: React.ReactNode | null
  handleTabClick: (id: string) => void
  setOnTabClicked: (cb: (() => void) | null) => void
  closeSidebar: () => void
  openLastTab: () => void
}

const SideBarContext = React.createContext<SideBarContextType | undefined>(undefined)

export function SideBarProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()
  const defaultDesktopTabId = navTabsTop[0]?.id ?? null

  const [currentTabId, setCurrentTabId] = React.useState<string | null>(defaultDesktopTabId)
  const [lastTab, setlastTab] = React.useState<string | null>(defaultDesktopTabId)

  React.useEffect(() => {
    // Close sidebar when switching to mobile or initial load on mobile
    if (isMobile !== undefined && isMobile) {
      setCurrentTabId(null)
    }
  }, [isMobile])

  const [onTabClicked, setOnTabClicked] = React.useState<(() => void) | null>(null)

  const currentTabComponent = React.useMemo(() => {
    const currentTab = navTabsTop.find(tab => tab.id === currentTabId) || navTabsBottom.find(tab => tab.id === currentTabId)
    return currentTab ? currentTab.sideBarComponent : null
  }, [currentTabId])

  const isOpen = currentTabId !== null

  const handleTabClick = (id: string) => {
    onTabClicked?.()
    setlastTab(id)
    setCurrentTabId(prev => prev === id ? null : id)
  }

  const closeSidebar = () => {
    if (currentTabId) {
      setlastTab(currentTabId)
    }
    setCurrentTabId(null)
  }

  const openLastTab = () => {
    if (lastTab) {
      setCurrentTabId(lastTab)
    }
  }

  return <SideBarContext.Provider value={{ isOpen, currentTabId, handleTabClick, closeSidebar, openLastTab, setOnTabClicked, currentTabComponent }}>
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