"use client"

import {useFileSystem} from "@/context/FileSystemContext";
import { cn } from "@/lib/utils";
import {XIcon} from "lucide-react";

export default function OpenFiles() {
  const {openFiles, activeFile, selectFile, closeFile} = useFileSystem()

  return <div className={cn(
    "fixed top-10 left-12 md:left-76 right-0 z-30 flex h-10 flex overflow-x-auto font-headline font-medium text-sm tracking-tight",
    openFiles.length > 0 ? "bg-muted" : "bg-transparent"
  )}>
    {openFiles.map((file) => (
      <button
        key={file.name}
        onClick={(e) => {
          selectFile(file.id)
        }}
        className={`group px-4 py-2 flex items-center h-full transition-colors ${
          file.id == activeFile?.id
            ? "bg-[#1e1f22] border-t-2 border-primary text-foreground -mb-0.5"
            : "bg-muted text-muted-foreground hover:bg-[#323232]"
        }`}
      >
        <p className="mr-2">{file.name}</p>
        <XIcon className={cn(
          "h-4 w-4 opacity-0 group-hover:opacity-100",
          file.id == activeFile?.id ? "hover:text-primary" : "hover:text-foreground"
        )} onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          closeFile(file.id)
        }} />
      </button>
    ))}
  </div>
}