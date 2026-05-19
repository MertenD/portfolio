"use client"

import Link from "next/link"
import Image from "next/image"
import { GithubIcon, ExternalLinkIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileContentContainer } from "@/components/portfolio/file-content-container"
import { ZoomableImage } from "@/components/ui/zoomable-image"

const tech = ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Docker", "Traefik", "Tailwind CSS"]

const features = [
  {
    title: "Drag-and-drop Workflow Editor",
    description: "Design gamified business processes visually. Connect activities, gateways, and roles via a node-based editor. Each activity node is configurable with gamification rewards directly in the panel.",
    image: "/images/process-flow/editor.png",
    imageAlt: "ProcessFlow workflow editor with node graph",
    height: 320,
  },
  {
    title: "Live Monitoring Dashboard",
    description: "Real-time overview of all active process instances — total, completed, in-progress, and blocked. Per-process charts show instance trends over time and task progress breakdowns.",
    image: "/images/process-flow/monitoring.png",
    imageAlt: "ProcessFlow monitoring dashboard with charts",
    height: 300,
  },
  {
    title: "Task Worklist",
    description: "Users see only the tasks assigned to their role. Tasks are automatically pushed to the worklist as the process engine advances. Each task can be opened, completed, and tracked inline.",
    image: "/images/process-flow/tasks.png",
    imageAlt: "ProcessFlow task list view",
    height: 280,
  },
  {
    title: "Gamification & Statistics",
    description: "Every completed task earns XP, coins, and badges based on configurable gamification rules defined in the editor. Users track their progress, level, and achievements on their personal stats page.",
    image: "/images/process-flow/stats.png",
    imageAlt: "ProcessFlow user statistics with XP, level and badges",
    height: 240,
  },
  {
    title: "Plugin System — Activity Shop",
    description: "Activities are external servers that render custom task UIs inside iframes. The shop lists all available activity types — manual or automatic — that can be dropped into any process. Teams can publish their own activities.",
    image: "/images/process-flow/shop.png",
    imageAlt: "ProcessFlow activity shop with plugin cards",
    height: 260,
  },
  {
    title: "Role-based Access Control",
    description: "Every team member gets a role with a configurable color and page permissions. Roles control which pages (Editor, Tasks, Monitoring, Statistics) a user can access, and which process activities are assigned to them.",
    image: "/images/process-flow/roles.png",
    imageAlt: "ProcessFlow role management table",
    height: 220,
  },
]

export default function ProcessFlowPage() {
  return (
    <FileContentContainer
      filePath="projects/ProcessFlow.tsx"
      title={
        <span className="flex items-center gap-3">
          <Image
            src="/images/process-flow/icon.png"
            alt="ProcessFlow icon"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span>Process<span className="text-primary">Flow</span></span>
        </span>
      }
      subtitle="Web app for building and executing gamified business processes"
      headerRight={
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline">
            <Link href="https://processflow.mertendieckmann.de" target="_blank" rel="noreferrer">
              <ExternalLinkIcon />
              Live Demo
            </Link>
          </Button>
          <Button asChild size="sm" variant="default">
            <Link href="https://github.com/MertenD/process-flow" target="_blank" rel="noreferrer">
              <GithubIcon />
              GitHub
            </Link>
          </Button>
        </div>
      }
    >
      <ZoomableImage
        src="/images/process-flow/dashboard-dark.png"
        alt="ProcessFlow team dashboard"
        height={340}
      />

      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">Overview</CardTitle>
          <CardDescription>Gamified Business Process Management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            ProcessFlow lets teams design, deploy, and run gamified business workflows. Instead of static checklists,
            teams model structured processes with a visual editor — including gateways, parallel flows, and role
            assignments. As process instances run, tasks are automatically pushed to the right users based on their
            role and the current process state.
          </p>
          <p>
            Completing tasks earns XP, coins, and badges, turning day-to-day work into a progression system.
            A plugin architecture lets anyone extend the platform with custom activity types hosted on external servers.
          </p>
          <Separator />
          <div className="flex flex-wrap gap-2 pt-1">
            {tech.map((t) => (
              <Badge key={t} variant="outline" className="font-mono text-xs">{t}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {features.map((f) => (
          <Card key={f.title} className="bg-popover flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="font-headline text-base">{f.title}</CardTitle>
              <CardDescription className="text-sm">{f.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <ZoomableImage src={f.image} alt={f.imageAlt} height={f.height} />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">Process Engine Architecture</CardTitle>
          <CardDescription>
            Database-driven engine: each completed task triggers the next flow element via a Supabase function,
            enabling concurrent process instances with no dedicated backend server.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ZoomableImage
            src="/images/process-flow/engine-overview.png"
            alt="ProcessFlow engine architecture diagram"
            height={180}
          />
        </CardContent>
      </Card>
    </FileContentContainer>
  )
}
