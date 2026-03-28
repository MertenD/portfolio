import React from "react";
import {BotMessageSquareIcon, FolderOpenIcon, GithubIcon, LinkedinIcon, SearchIcon, SettingsIcon} from "lucide-react";
import {FileExplorer} from "@/components/portfolio/sidebar/file-explorer";
import Search from "@/components/portfolio/sidebar/search";
import {Tab, TabLink} from "@/context/side-bar-context";
import Settings from "@/components/portfolio/sidebar/settings";

export const navTabsTop: Tab[] = [
  {id: "fileSystem", label: "Project Explorer", icon: FolderOpenIcon, sideBarComponent: <FileExplorer />},
  {id: "search", label: "Search", icon: SearchIcon, sideBarComponent: <Search />},
  {id: "chat", label: "Chat", icon: BotMessageSquareIcon, sideBarComponent: <p>Chat</p>},
]

export const navTabsBottom: Tab[] = [
  {id: "settings", label: "Settings", icon: SettingsIcon, sideBarComponent: <Settings />}
]

export const navTabLinks: TabLink[] = [
  {id: "github", label: "GitHub", icon: GithubIcon, href: "https://github.com/MertenD"},
  {id: "linkedin", label: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/in/merten-dieckmann/"}
]

