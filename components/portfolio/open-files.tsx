"use client"

import React from "react";
import {useFileSystem} from "@/context/file-system-context";
import {cn} from "@/lib/utils";
import {GripVerticalIcon, XIcon} from "lucide-react";
import {closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable
} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {restrictToHorizontalAxis, restrictToParentElement} from "@dnd-kit/modifiers";
import {useIsMobile} from "@/hooks/use-mobile";

interface SortableOpenFileTabProps {
  fileId: string
  name: string
  isActive: boolean
  onSelect: () => void
  onClose: () => void
}

function SortableOpenFileTab({fileId, name, isActive, onSelect, onClose}: SortableOpenFileTabProps) {
  const isMobile = useIsMobile()

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({id: fileId})

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform ? {...transform, y: 0} : null),
    transition,
    opacity: isDragging ? 0.8 : 1,
    position: isDragging ? "relative" : undefined,
    zIndex: isDragging ? 50 : undefined
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group h-full shrink-0 transition-colors select-none whitespace-nowrap",
        isActive
          ? "bg-popover border-t-2 border-primary text-foreground -mb-0.5"
          : "bg-muted text-muted-foreground hover:bg-ide-tooltip"
      )}
      {...attributes}
      onClick={(e) => {
        e.preventDefault()
        onSelect()
      }}
      role="tab"
      aria-selected={isActive}
    >
      <div className="px-4 py-2 flex items-center h-full">
        <button
          ref={setActivatorNodeRef}
          type="button"
          className={cn(
            "mr-2 inline-flex items-center opacity-0 group-hover:opacity-100",
            isDragging ? "opacity-100" : "",
            "hover:opacity-100 cursor-grab active:cursor-grabbing",
            isActive ? "text-foreground" : "text-muted-foreground"
          )}
          {...listeners}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          aria-label={`Move tab ${name}`}
        >
          <GripVerticalIcon className="h-4 w-4" />
        </button>

        <span className="mr-2">{name}</span>

        <button
          type="button"
          className={cn(
            "inline-flex items-center",
            isMobile ? "" : "opacity-0 group-hover:opacity-100",
            isActive ? "hover:text-primary" : "hover:text-foreground"
          )}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onClose()
          }}
          aria-label={`close ${name}`}
          title="close"
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default function OpenFiles() {
  const {openFiles, activeFileId, selectFile, closeFile, reorderOpenFiles} = useFileSystem()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {distance: 6}
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis, restrictToParentElement]}
      onDragEnd={(event) => {
        const {active, over} = event
        if (!over) return
        if (active.id === over.id) return
        reorderOpenFiles(String(active.id), String(over.id))
      }}
    >
      <SortableContext
        items={openFiles.map((f) => f.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div
          className={cn(
            "sticky top-0 z-30 h-10 min-w-0",
            openFiles.length > 0 ? "bg-muted" : "bg-transparent"
          )}
        >
          <div className="h-full w-full min-w-0 overflow-x-auto overflow-y-hidden touch-pan-x">
            <div className="h-full flex font-headline font-medium text-sm tracking-tight">
              {openFiles.map((file) => (
                <SortableOpenFileTab
                  key={file.id}
                  fileId={file.id}
                  name={file.name}
                  isActive={file.id === activeFileId}
                  onSelect={() => selectFile(file.id)}
                  onClose={() => closeFile(file.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </SortableContext>
    </DndContext>
  )
}