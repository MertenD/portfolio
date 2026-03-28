import {SearchIcon} from "lucide-react";

export default function Search() {

  return <div className="hidden md:flex items-center bg-popover p-2 rounded border border-border text-muted-foreground text-xs">
    <SearchIcon className="w-3.5 h-3.5 mr-2" />
    <span>Search...</span>
    <span className="ml-4 opacity-50">Ctrl+Shift+A</span>
  </div>
}