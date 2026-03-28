"use client"

import {useSideBar} from "@/context/side-bar-context";
import {cn} from "@/lib/utils";
import {
	BotMessageSquareIcon,
	FolderOpenIcon,
	GithubIcon,
	LinkedinIcon,
	LucideProps,
	Search,
	SearchIcon,
	SettingsIcon
} from "lucide-react";
import Link from "next/link";
import React, {ForwardRefExoticComponent, JSX, RefAttributes} from "react";
import {FileExplorer} from "@/components/portfolio/sidebar/file-explorer";

export const navTabsTop: Tab[] = [
	{id: "fileSystem", label: "Project Explorer", icon: FolderOpenIcon, sideBarComponent: <FileExplorer />},
	{id: "search", label: "Search", icon: SearchIcon, sideBarComponent: <Search />},
	{id: "chat", label: "Chat", icon: BotMessageSquareIcon, sideBarComponent: <p>Chat</p>},
]

export const navTabsBottom: Tab[] = [
	{id: "settings", label: "Settings", icon: SettingsIcon, sideBarComponent: <SettingsIcon />}
]

export const navTabLinks: TabLink[] = [
	{id: "github", label: "GitHub", icon: GithubIcon, href: "https://github.com/MertenD"},
	{id: "linkedin", label: "LinkedIn", icon: LinkedinIcon, href: "https://www.linkedin.com/in/merten-dieckmann/"}
]

export function SideNav() {

	return (
		<aside className="sticky left-0 top-10 h-[calc(100vh-40px)] shrink-0 flex flex-col items-center justify-between py-4 w-12 z-40 bg-popover border-r border-border">
			<div className="flex flex-col gap-6 items-center w-full">
				{navTabsTop.map((tab) => (
					<NavTab key={tab.id} tab={tab} />
				))}
			</div>
			<div className="flex flex-col gap-6 items-center w-full">
				{navTabLinks.map((tab) => (
					<NavTabLink key={tab.id} tab={tab} />
				))}
				{navTabsBottom.map((tab) => (
					<NavTab key={tab.id} tab={tab} />
				))}
			</div>
		</aside>
	)
}

function NavTab({ tab }: { tab: Tab }) {
	const { handleTabClick, currentTabId } = useSideBar()

	return (
		<button
			key={tab.label}
			className={cn("w-full py-2 flex justify-center group relative transition-all",
				tab.id === currentTabId
					? "text-primary border-l-2 border-primary bg-ide-hover"
					: "text-ide-icon-muted opacity-70 hover:text-foreground hover:bg-ide-hover"
			)}
			onClick={() => handleTabClick(tab.id)}
		>
			<tab.icon className="w-5 h-5"/>
			<span className="absolute left-14 bg-ide-tooltip text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
				{tab.label}
			</span>
		</button>
	)
}

function NavTabLink({ tab }: { tab: TabLink }) {
	return (
		<Link
			className={cn("w-full py-2 flex justify-center group relative transition-all",
				"text-ide-icon-muted opacity-70 hover:text-foreground hover:bg-ide-hover"
			)}
			href={tab.href
			}
			target="_blank"
			rel="noopener noreferrer"
		>
			<tab.icon className="w-5 h-5"/>
			<span className="absolute left-14 bg-ide-tooltip text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
				{tab.label}
			</span>
		</Link>
	)
}

export type Tab = {
	id: string
	label: string
	icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
	sideBarComponent: JSX.Element
}

export type TabLink = Omit<Tab, "sideBarComponent"> & { href: string }
