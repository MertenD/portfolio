import PagesMain from "@/components/pages/pages-main";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {FileExplorer} from "@/components/portfolio/file-explorer";
import OpenFiles from "@/components/portfolio/open-files";

export default function PortfolioPage() {
  return <>
    <div className="hidden md:flex min-h-0 h-full self-stretch w-full min-w-0">
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-0 h-full self-stretch min-w-0"
      >
        <ResizablePanel
          defaultSize={25}
          minSize={20}
          className="min-h-0 h-full min-w-0"
        >
          <FileExplorer />
        </ResizablePanel>
        <ResizableHandle/>
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
