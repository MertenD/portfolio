"use client"

import {useFileSystem} from "@/context/FileSystemContext";
export default function PagesMain() {

  const { activeFile } = useFileSystem()

  if (!activeFile) {
    return <section className="h-full w-full flex items-center justify-center">
      No file selected
    </section>
  }

  return activeFile?.component
}