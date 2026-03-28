"use client"

import React, {useContext, useEffect} from "react";
import {useQueryState} from 'nuqs'
import {fileSystemContent} from "@/content/file-system-content";
import {findFileById} from "@/context/file-system-context-utils";

export type File = {
  id: string
  name: string
  component: React.ReactNode
}

export type Folder = {
  id: string
  name: string
  content: Array<File | Folder>
}

interface FileSystemContextType {
  closedFolders: string[]
  toggleFolder: (folderId: string) => void
  isOpen: (folderId: string) => boolean
  openAllFolders: () => void
  openFiles: File[]
  activeFileId: string | null
  getActiveFile: () => File | null
  openFile: (file: File) => void
  closeFile: (fileId: string) => void
  selectFile: (fileId: string) => void
  reorderOpenFiles: (activeId: string, overId: string) => void
}

const FileSystemContext = React.createContext<FileSystemContextType | undefined>(undefined)

export function FileSystemProvider({children}: { children: React.ReactNode }) {
  const [closedFolders, setClosedFolders] = React.useState<string[]>([])

  const toggleFolder = (folderId: string) => {
    setClosedFolders((prev) => {
      if (prev.includes(folderId)) {
        return prev.filter((id) => id !== folderId)
      } else {
        return [...prev, folderId]
      }
    })
  }

  const isOpen = (folderId: string) => !closedFolders.includes(folderId)

  const openAllFolders = () => {
    setClosedFolders([])
  }

  const [openFiles, setOpenFiles] = React.useState<File[]>([])
  const [activeFileId, setActiveFileId] = useQueryState("activeFile")

  const getActiveFile = () => {
    return openFiles.find((f) => f.id === activeFileId) || null
  }

  const openFile = (file: File) => {
    setOpenFiles((prev) => {
      if (!prev.find((f) => f.id === file.id)) {
        return [...prev, file]
      }
      return prev
    })
    setActiveFileId(file.id)
  }

  const closeFile = (fileId: string) => {
    setOpenFiles((prev) => prev.filter((f) => f.id !== fileId))
    if (activeFileId === fileId) {
      setActiveFileId(null)
    }
  }

  const selectFile = (fileId: string) => {
    const file = openFiles.find((f) => f.id === fileId)
    if (file) {
      setActiveFileId(file.id)
    }
  }

  const reorderOpenFiles = (activeId: string, overId: string) => {
    if (activeId === overId) return

    setOpenFiles((prev) => {
      const oldIndex = prev.findIndex((f) => f.id === activeId)
      const newIndex = prev.findIndex((f) => f.id === overId)
      if (oldIndex < 0 || newIndex < 0) return prev

      const next = prev.slice()
      const [moved] = next.splice(oldIndex, 1)
      next.splice(newIndex, 0, moved)
      return next
    })
  }

  // On initial load, check if there's an active file in the query state and open it
  useEffect(() => {
    if (activeFileId) {
      const readmeFile = findFileById(fileSystemContent, "readme") as File
      if (readmeFile) {
        openFile(readmeFile)
      }
      const file = findFileById(fileSystemContent, activeFileId)
      if (file) {
        openFile(file as File)
      }
    } else {
      const readmeFile = findFileById(fileSystemContent, "readme") as File
      if (readmeFile) {
        openFile(readmeFile)
      }
    }
  }, [])

  return (
    <FileSystemContext.Provider value={{
      closedFolders,
      toggleFolder,
      isOpen,
      openAllFolders,
      openFiles,
      activeFileId,
      getActiveFile,
      openFile,
      closeFile,
      selectFile,
      reorderOpenFiles
    }}>
      {children}
    </FileSystemContext.Provider>
  )
}

export function useFileSystem() {
  const context = useContext(FileSystemContext)
  if (!context) {
    throw new Error("useFileSystem must be used within a FileSystemProvider")
  }
  return context
}