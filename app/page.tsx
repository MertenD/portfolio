"use client"

import PagesMain from "@/components/pages/pages-main";
import {ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import OpenFiles from "@/components/portfolio/open-files";
import SideBar from "@/components/portfolio/sidebar/side-bar";
import {useSideBar} from "@/context/side-bar-context";
import { useResizableSidebarPanel } from "@/hooks/use-resizable-sidebar-panel";
import {cn} from "@/lib/utils";
import {useEffect} from "react";

export default function PortfolioPage() {
  const { isOpen, closeSidebar, openLastTab, setOnTabClicked } = useSideBar()
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

    { /* Mobile layout: same left nav, sidebar overlays content (no resize) */}
    <div className="md:hidden flex flex-1 h-full min-h-0 w-full overflow-hidden">
      <div className="relative flex-1 flex min-h-0 min-w-0 h-full w-full max-w-full">
        <MainContent />

        {isOpen && (
          <div
            className="absolute inset-y-0 left-0 right-0 z-40"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="absolute inset-0 bg-background/60"
              onClick={closeSidebar}
              aria-label="Close sidebar"
            />

            <div className="absolute inset-y-0 left-0 w-[min(80vw,320px)]">
              <SideBar />
            </div>
          </div>
        )}
      </div>
    </div>
  </>
}

function MainContent({ className }: { className?: string }) {
  return <div className={cn("flex-1 min-h-0 flex flex-col min-w-0 w-full max-w-full", className)}>
    <OpenFiles />
    <main className="flex-1 min-h-0 overflow-y-auto min-w-0 w-full max-w-full">
      <PagesMain />
    </main>
  </div>
}