"use client"

import {Tab, TabLink, useSideBar} from "@/context/side-bar-context";
import {cn} from "@/lib/utils";
import Link from "next/link";
import React from "react";
import {navTabLinks, navTabsBottom, navTabsTop} from "@/content/side-nav-content";

export function SideNav() {

	return (
		<aside className="sticky left-0 top-10 bottom-0 shrink-0 flex flex-col items-center justify-between py-4 w-12 z-40 bg-popover border-r border-border">
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
