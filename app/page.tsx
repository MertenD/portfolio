"use client"

import PagesMain from "@/components/pages/pages-main";
import {ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import OpenFiles from "@/components/portfolio/open-files";
import SideBar from "@/components/portfolio/side-bar";
import {useSideBar} from "@/context/side-bar-context";
import { useResizableSidebarPanel } from "@/hooks/use-resizable-sidebar-panel";
import {cn} from "@/lib/utils";
import {useEffect} from "react";

export default function PortfolioPage() {
  const { isOpen, close: closeSidebar, openLastTab, setOnTabClicked } = useSideBar()
  const { sidebarRef, saveLastWidth } = useResizableSidebarPanel(isOpen)

  useEffect(() => {
    setOnTabClicked(() => saveLastWidth)
    return () => setOnTabClicked(null)
  }, [setOnTabClicked, saveLastWidth])

  return <>
    { /* Desktop layout with resizable sidebar */}
    <div className="hidden md:flex min-h-0 h-full self-stretch w-full min-w-0">
      <ResizablePanelGroup
        orientation="horizontal"
        className={cn("min-h-0 h-full self-stretch min-w-0", /*!isOpen && "invisible"*/)}
      >
        <ResizablePanel
          panelRef={sidebarRef}
          defaultSize={1}
          maxSize={"80"}
          minSize={100}
          className="min-h-0 h-full min-w-0"
          collapsible
          onResize={() => {
            if (sidebarRef.current) {
              const panelSize = sidebarRef.current.getSize().inPixels
              if (panelSize <= 100 && panelSize > 0) {
                saveLastWidth()
              }
              if (panelSize < 100) {
                closeSidebar()
              }
              if (!isOpen && panelSize >= 100) {
                openLastTab()
              }
            }
          }}
        >
          {isOpen && <SideBar /> }
        </ResizablePanel>
        <ResizablePanel className="flex flex-col min-h-0 h-full min-w-0">
          <MainContent />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>

    { /* Mobile layout */}
    <MainContent className="md:hidden" />
  </>
}

function MainContent({ className }: { className?: string }) {
  return <div className={cn("flex-1 min-h-0 flex flex-col min-w-0", className)}>
    <OpenFiles />
    <main className="flex-1 min-h-0 overflow-y-auto min-w-0">
      <PagesMain />
    </main>
  </div>
}