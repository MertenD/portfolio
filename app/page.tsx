import PagesMain from "@/components/pages/pages-main";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {FileExplorer} from "@/components/portfolio/file-explorer";
import OpenFiles from "@/components/portfolio/open-files";

export default function PortfolioPage() {
  return <>
    <div className="hidden md:flex min-h-0 h-full self-stretch w-full">
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-0 h-full self-stretch"
      >
        <ResizablePanel
          defaultSize={25}
          minSize={20}
          className="min-h-0 h-full"
        >
          <FileExplorer />
        </ResizablePanel>
        <ResizableHandle/>
        <ResizablePanel defaultSize={75} className="flex flex-col min-h-0 h-full">
          <div className="flex-1 min-h-0 flex flex-col">
            <OpenFiles />
            <main className="flex-1 min-h-0 overflow-y-auto">
              <PagesMain />
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>

    <div className="md:hidden flex-1 min-h-0 flex flex-col">
      <OpenFiles />
      <main className="flex-1 min-h-0 overflow-y-auto">
        <PagesMain />
      </main>
    </div>
  </>
}
