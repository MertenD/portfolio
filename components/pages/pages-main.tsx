"use client"

import {useFileSystem} from "@/context/file-system-context";
export default function PagesMain() {

  const { getActiveFile } = useFileSystem()
  const activeFile = getActiveFile()

  if (!activeFile) {
    return <section className="h-full w-full flex items-center justify-center">
      No file selected
    </section>
  }

  return activeFile?.component
}