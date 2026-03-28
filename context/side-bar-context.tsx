"use client"

import React from "react";
import {BotMessageSquareIcon, FolderOpenIcon, SearchIcon, SettingsIcon} from "lucide-react";
import {FileExplorer} from "@/components/portfolio/sidebar/file-explorer";
import Search from "@/components/portfolio/sidebar/search";
import {useIsMobile} from "@/hooks/use-mobile";

export const navTabsTop = [
  {id: "fileSystem", label: "Project Explorer", icon: FolderOpenIcon, sideBarComponent: <FileExplorer />},
  {id: "search", label: "Search", icon: SearchIcon, sideBarComponent: <Search />},
  {id: "chat", label: "Chat", icon: BotMessageSquareIcon, sideBarComponent: <p>Chat</p>},
]

export const navTabsBottom = [
  {id: "settings", label: "Settings", icon: SettingsIcon, sideBarComponent: <p>Settings</p>}
]

interface SideBarContextType {
  isOpen: boolean
  currentTabId: string | null
  currentTabComponent: React.ReactNode | null
  handleTabClick: (id: string) => void
  setOnTabClicked: (cb: (() => void) | null) => void
  close: () => void
  openLastTab: () => void
}

const SideBarContext = React.createContext<SideBarContextType | undefined>(undefined)

export function SideBarProvider({ children }: { children: React.ReactNode }) {
  const [currentTabId, setCurrentTabId] = React.useState<string | null>(navTabsTop[0].id)
  const [lastTab, setlastTab] = React.useState<string | null>(navTabsTop[0].id)
  const [onTabClicked, setOnTabClicked] = React.useState<(() => void) | null>(null)

  const currentTabComponent = React.useMemo(() => {
    const currentTab = navTabsTop.find(tab => tab.id === currentTabId)
    return currentTab ? currentTab.sideBarComponent : null
  }, [currentTabId])

  const isOpen = currentTabId !== null

  const handleTabClick = (id: string) => {
    onTabClicked?.()
    setlastTab(id)
    setCurrentTabId(prev => prev === id ? null : id)
  }

  const close = () => {
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


  return <SideBarContext.Provider value={{ isOpen, currentTabId, handleTabClick, close, openLastTab, setOnTabClicked, currentTabComponent }}>
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