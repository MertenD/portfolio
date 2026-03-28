"use client"

import PagesMain from "@/components/pages/pages-main";
import {ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import OpenFiles from "@/components/portfolio/open-files";
import SideBar from "@/components/portfolio/side-bar";
import {useSideBar} from "@/context/side-bar-context";
import { useResizableSidebarPanel } from "@/hooks/use-resizable-sidebar-panel";

export default function PortfolioPage() {
  const { isOpen } = useSideBar()
  const { sidebarRef } = useResizableSidebarPanel(isOpen)

  return <>
    { /* Desktop layout with resizable sidebar */}
    <div className="hidden md:flex min-h-0 h-full self-stretch w-full min-w-0">
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-0 h-full self-stretch min-w-0"
      >
        <ResizablePanel
          panelRef={sidebarRef}
          defaultSize={1}
          className="min-h-0 h-full min-w-0"
          collapsible
        >
          {isOpen && <SideBar /> }
        </ResizablePanel>
        <ResizablePanel className="flex flex-col min-h-0 h-full min-w-0">
          <div className="flex-1 min-h-0 flex flex-col min-w-0">
            <OpenFiles />
            <main className="flex-1 min-h-0 overflow-y-auto min-w-0">
              <PagesMain />
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>

    { /* Mobile layout */}
    <div className="md:hidden flex-1 min-h-0 flex flex-col min-w-0">
      <OpenFiles />
      <main className="flex-1 min-h-0 overflow-y-auto min-w-0">
        <PagesMain />
      </main>
    </div>
  </>
}
