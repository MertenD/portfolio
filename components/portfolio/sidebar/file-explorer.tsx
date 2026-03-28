"use client"

import {
  ChevronDownIcon,
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  FileTextIcon,
  FolderClosedIcon,
  FolderOpenIcon
} from "lucide-react"
import React from "react";
import {File, Folder, useFileSystem} from "@/context/file-system-context";
import {cn} from "@/lib/utils";
import {fileSystemContent} from "@/content/file-system-content";
import {useIsMobile} from "@/hooks/use-mobile";
import {useSideBar} from "@/context/side-bar-context";

export function FileExplorer() {
  const {openAllFolders, closeAllFolders} = useFileSystem()

  return <aside
    className="h-full overflow-y-auto flex w-full flex-col z-40 bg-popover"
  >
    <div
      className="px-2 py-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex justify-between items-center"
    >
      <span>Project</span>
      <div className="flex flex-row gap-2">
        <ChevronsUpDownIcon className="w-3.5 h-3.5 cursor-pointer" onClick={openAllFolders}/>
        <ChevronsDownUpIcon className="w-3.5 h-3.5 cursor-pointer ml-1" onClick={closeAllFolders}/>
      </div>
    </div>
    <div className="flex flex-col text-xs font-mono">
      {fileSystemContent.map((item) => (
        <FileItem key={item.name} item={item} level={0}/>
      ))}
    </div>
  </aside>
}

export function FileItem({item, level}: { item: File | Folder, level: number }) {
  const isMobile = useIsMobile()
  const {isOpen, toggleFolder, openFile, activeFileId} = useFileSystem()
  const {closeSidebar} = useSideBar()

  if ('component' in item) {
    // File
    return <button
      onClick={() => {
        openFile(item)
        if (isMobile) {
          closeSidebar()
        }
      }}
      className={cn(
        "flex items-center gap-1 px-2 py-1 hover:bg-ide-hover cursor-pointer text-foreground",
        activeFileId === item.id ? "bg-ide-hover" : ""
      )}
      style={{paddingLeft: `${level * 16}px`}}
    >
      <FileTextIcon className="w-3.5 h-3.5 text-secondary shrink-0"/>
      <span className="select-none">{item.name}</span>
    </button>
  }

  const isFolderOpen = isOpen(item.id)

  // Folder
  return <div className="flex flex-col">
    <div
      className="flex items-center gap-1 px-2 py-1 hover:bg-ide-hover cursor-pointer text-foreground"
      style={{paddingLeft: `${level * 16}px`}}
      onClick={() => toggleFolder(item.id)}
    >
      {isFolderOpen ? <>
        <ChevronDownIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0"/>
        <FolderOpenIcon className="w-3.5 h-3.5 text-primary shrink-0"/>
      </> : <>
        <ChevronDownIcon className="w-3.5 h-3.5 text-muted-foreground -rotate-90 shrink-0"/>
        <FolderClosedIcon className="w-3.5 h-3.5 text-primary shrink-0"/>
      </>}
      <span className="select-none">{item.name}</span>
    </div>
    { isFolderOpen && <div className="flex flex-col">
      {item.content.map((child) => (
        <FileItem key={child.name} item={child} level={level + 1}/>
      ))}
    </div> }
  </div>
}
