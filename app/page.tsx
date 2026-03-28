"use client"

import PagesMain from "@/components/pages/pages-main";
import {ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import OpenFiles from "@/components/portfolio/open-files";
import SideBar from "@/components/portfolio/side-bar";
import {useSideBar} from "@/context/side-bar-context";
import {useCallback, useEffect} from "react";
import {usePanelRef} from "react-resizable-panels";

export default function PortfolioPage() {
  const { isOpen } = useSideBar()

  const sidebarRef = usePanelRef()

  const expandSidebar = useCallback(() => {
    if (sidebarRef.current) {
      sidebarRef.current.expand()
    }
  }, [sidebarRef])

  const collapseSidebar = useCallback(() => {
    if (sidebarRef.current) {
      sidebarRef.current.collapse()
    }
  }, [sidebarRef])

  useEffect(() => {
    if (isOpen) {
      expandSidebar()
    } else {
      collapseSidebar()
    }
  }, [isOpen, expandSidebar, collapseSidebar])

  return <>
    <div className="hidden md:flex min-h-0 h-full self-stretch w-full min-w-0">
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-0 h-full self-stretch min-w-0"
      >
        <ResizablePanel
          panelRef={sidebarRef}
          defaultSize={25}
          minSize={25}
          className="min-h-0 h-full min-w-0"
          collapsible
        >
          <SideBar />
        </ResizablePanel>
        <ResizablePanel defaultSize={75} className="flex flex-col min-h-0 h-full min-w-0">
          <div className="flex-1 min-h-0 flex flex-col min-w-0">
            <OpenFiles />
            <main className="flex-1 min-h-0 overflow-y-auto min-w-0">
              <PagesMain />
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>

    <div className="md:hidden flex-1 min-h-0 flex flex-col min-w-0">
      <OpenFiles />
      <main className="flex-1 min-h-0 overflow-y-auto min-w-0">
        <PagesMain />
      </main>
    </div>
  </>
}
