"use client"

import {useFileSystem} from "@/context/FileSystemContext";
export default function PagesMain() {

  const { activeFile } = useFileSystem()

  return activeFile?.component
}