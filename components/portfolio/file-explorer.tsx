"use client"

import {ChevronDownIcon, ChevronsUpDownIcon, FileTextIcon, FolderClosedIcon, FolderOpenIcon} from "lucide-react"
import React from "react";
import {File, Folder, useFileSystem} from "@/context/FileSystemContext";
import BierturnierPage from "@/components/pages/projects/bierturnier-page";
import LanguageLearningPage from "@/components/pages/projects/language-learning-page";
import LuzidesTraeumenPage from "@/components/pages/projects/luzides-traeumen-page";
import MuscleGroupAPIPage from "@/components/pages/projects/muscle-group-api-page";
import ProcessFlowPage from "@/components/pages/projects/process-flow-page";
import ReadmePage from "@/components/pages/readme-page";

export function FileExplorer() {
  const {openAllFolders} = useFileSystem()

  const content: Array<File | Folder> = [
    {
      id: "portfolio",
      name: "portfolio",
      content: [
        {
          id: "projects",
          name: "projects",
          content: [
            {id: "biertunrier", name: "Bierturnier.rb", component: <BierturnierPage />},
            {id: "language-learning", name: "LanguageLearning.tsx", component: <LanguageLearningPage />},
            {id: "luzides-traeumen", name: "LuzidesTraeumen.tex", component: <LuzidesTraeumenPage />},
            {id: "muscle-group-api", name: "MuscleGroupAPI.php", component: <MuscleGroupAPIPage />},
            {id: "process-flow", name: "ProcessFlow.tsx", component: <ProcessFlowPage />}
          ]
        },
        {id: "readme", name: "README.md", component: <ReadmePage />}
      ]
    }
  ]

  return <aside
    className="overflow-y-auto hidden fixed left-12 top-10 bottom-0 md:flex flex-col w-64 z-40 bg-[#1e1f22] border-r border-border"
  >
    <div
      className="px-4 py-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex justify-between items-center">
      <span>Project</span>
      <ChevronsUpDownIcon className="w-3.5 h-3.5 cursor-pointer" onClick={openAllFolders}/>
    </div>
    <div className="px-2 flex flex-col text-xs font-mono">
      {content.map((item) => (
        <FileItem key={item.name} item={item} level={0}/>
      ))}
    </div>
  </aside>
}

export function FileItem({item, level}: { item: File | Folder, level: number }) {
  const {isOpen, toggleFolder, openFile} = useFileSystem()

  if ('component' in item) {
    // File
    return <button
      onClick={() => {
        openFile(item)
      }}
      className="flex items-center gap-1 px-2 py-1 hover:bg-[#2b2d30] cursor-pointer text-foreground"
      style={{paddingLeft: `${level * 16}px`}}
    >
      <FileTextIcon className="w-3.5 h-3.5 text-secondary"/>
      <span className="select-none">{item.name}</span>
    </button>
  }

  const isFolderOpen = isOpen(item.id)

  // Folder
  return <div className="flex flex-col">
    <div
      className="flex items-center gap-1 px-2 py-1 hover:bg-[#2b2d30] cursor-pointer text-foreground"
      style={{paddingLeft: `${level * 16}px`}}
      onClick={() => toggleFolder(item.id)}
    >
      {isFolderOpen ? <>
        <ChevronDownIcon className="w-3.5 h-3.5 text-muted-foreground"/>
        <FolderOpenIcon className="w-3.5 h-3.5 text-primary"/>
      </> : <>
        <ChevronDownIcon className="w-3.5 h-3.5 text-muted-foreground -rotate-90"/>
        <FolderClosedIcon className="w-3.5 h-3.5 text-primary"/>
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
