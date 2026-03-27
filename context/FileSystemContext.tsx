"use client"

import React, {useContext} from "react";

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
  activeFile: File | null
  openFile: (file: File) => void
  closeFile: (fileId: string) => void
  selectFile: (fileId: string) => void
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
  const [activeFile, setActiveFile] = React.useState<File | null>(null)

  const openFile = (file: File) => {
    setOpenFiles((prev) => {
      if (!prev.find((f) => f.id === file.id)) {
        return [...prev, file]
      }
      return prev
    })
    setActiveFile(file)
  }

  const closeFile = (fileId: string) => {
    setOpenFiles((prev) => prev.filter((f) => f.id !== fileId))
    if (activeFile?.id === fileId) {
      setActiveFile(null)
    }
  }

  const selectFile = (fileId: string) => {
    const file = openFiles.find((f) => f.id === fileId)
    if (file) {
      setActiveFile(file)
    }
  }

  return (
    <FileSystemContext.Provider value={{
      closedFolders,
      toggleFolder,
      isOpen,
      openAllFolders,
      openFiles,
      activeFile,
      openFile,
      closeFile,
      selectFile
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