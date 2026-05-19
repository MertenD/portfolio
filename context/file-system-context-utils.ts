import {File, Folder} from "@/context/file-system-context";

export function findFileById(
  items: Array<File | Folder>,
  id: string
): File | null {
  for (const item of items) {
    if ("component" in item && item.id === id) {
      return item
    }
    if ("content" in item) {
      const found = findFileById(item.content, id)
      if (found) return found
    }
  }
  return null
}

export function getInitiallyClosedFolderIds(
  items: Array<File | Folder>
): string[] {
  let closedIds: string[] = []
  for (const item of items) {
    if ("content" in item) {
      if (item.isInitiallyClosed) {
        closedIds.push(item.id)
      }
      closedIds = closedIds.concat(getInitiallyClosedFolderIds(item.content))
    }
  }
  return closedIds
}

export function getAllFolderIds(items: Array<File | Folder>): string[] {
  let folderIds: string[] = []
  for (const item of items) {
    if ("content" in item) {
      folderIds.push(item.id)
      folderIds = folderIds.concat(getAllFolderIds(item.content))
    }
  }
  return folderIds
}

export function getAllFiles(
  items: Array<File | Folder>,
  folderPath: string[] = []
): Array<{ file: File; path: string[] }> {
  const results: Array<{ file: File; path: string[] }> = []
  for (const item of items) {
    if ("component" in item) {
      results.push({ file: item, path: folderPath })
    } else {
      results.push(...getAllFiles(item.content, [...folderPath, item.name]))
    }
  }
  return results
}