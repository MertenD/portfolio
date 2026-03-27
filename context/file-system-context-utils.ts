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