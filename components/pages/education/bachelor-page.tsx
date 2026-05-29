"use client"

import { GithubIcon, ExternalLinkIcon, DownloadIcon } from "lucide-react"
import { TrackedLink } from "@/components/tracked-link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileContentContainer } from "@/components/portfolio/file-content-container"
import { ZoomableImage } from "@/components/ui/zoomable-image"

const tech = ["React", "TypeScript", "React Flow", "Zustand", "Docker"]

const results = [
  { label: "Editor requirements met", value: "6 / 7" },
  { label: "Engine requirements met", value: "6 / 6" },
  { label: "Gamification elements", value: "5" },
  { label: "User test engagement", value: "100% repeated quiz" },
]

const gamificationElements = [
  {
    title: "Challenges",
    description: "Timed tasks presented as single/multiple-choice questions or free-text inputs. Completing them unlocks rewards and advances the process.",
    image: "/images/bachelor-thesis/engine-challenge.png",
    alt: "Engine single-choice challenge UI",
    height: 220,
  },
  {
    title: "Rewards",
    description: "XP points, coins, and badges are awarded on task completion. Badge conditions can be hidden — discovered only through exploration — to incentivise re-runs.",
    image: "/images/bachelor-thesis/engine-reward.png",
    alt: "Engine earned reward screen showing XP and badges",
    height: 220,
  },
  {
    title: "Minimap",
    description: "A visual overview of the entire process, showing unexplored paths and locked rewards. In user tests, this alone motivated participants to replay the process.",
    image: "/images/bachelor-thesis/engine-minimap.png",
    alt: "Engine minimap showing process navigation",
    height: 220,
  },
]

export default function BachelorPage() {
  return (
    <FileContentContainer
      filePath="education/Bachelor.tex"
      title={<>Bachelor&apos;s Thesis</>}
      subtitle="Ulm University · Software Engineering B.Sc. · Oct 2019 – Jun 2023 · Grade: 1.4"
      headerRight={
        <div className="flex flex-wrap gap-2 justify-end">
          <Button asChild size="sm" variant="outline">
            <TrackedLink href="/Bachelorarbeit-Merten-Dieckmann.pdf" trackingName="Bachelor - Download Thesis" target="_blank" download>
              <DownloadIcon />
              Thesis
            </TrackedLink>
          </Button>
          <Button asChild size="sm" variant="outline">
            <TrackedLink href="http://gbpmneditor.mertendieckmann.de" trackingName="Bachelor - Editor Demo" target="_blank" rel="noreferrer">
              <ExternalLinkIcon />
              Editor Demo
            </TrackedLink>
          </Button>
          <Button asChild size="sm" variant="outline">
            <TrackedLink href="http://gbpmnengine.mertendieckmann.de" trackingName="Bachelor - Engine Demo" target="_blank" rel="noreferrer">
              <ExternalLinkIcon />
              Engine Demo
            </TrackedLink>
          </Button>
          <Button asChild size="sm" variant="default">
            <TrackedLink href="https://github.com/MertenD/gamificated-bpmn-editor" trackingName="Bachelor - GitHub" target="_blank" rel="noreferrer">
              <GithubIcon />
              GitHub
            </TrackedLink>
          </Button>
        </div>
      }
    >
      {/* Overview */}
      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">
            Design and Implementation of a Web-Based Environment for Creating and Executing Gamified BPMN 2.0 Models
          </CardTitle>
          <CardDescription>Gamified BPMN 2.0 — Editor &amp; Engine</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            Business processes modelled in BPMN 2.0 are the backbone of many organisations — but employees often find
            them monotonous and disengaging. This thesis investigates whether integrating gamification elements
            directly into BPMN process models can measurably improve motivation and engagement.
          </p>
          <p>
            The result is a two-part web platform: a node-based <strong className="text-foreground">Editor</strong> for
            designing gamified processes, and a browser-based <strong className="text-foreground">Engine</strong> for
            executing them — complete with challenges, XP, badges, coins, and a navigable minimap.
          </p>
          <Separator />
          <div className="flex flex-wrap gap-2 pt-1">
            {tech.map((t) => (
              <Badge key={t} variant="outline" className="font-mono text-xs">{t}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Two components */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-popover flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">BPMN Editor</CardTitle>
            <CardDescription>
              A visual, node-based editor for designing gamified business processes. Supports all standard BPMN 2.0
              elements plus custom gamification node types: challenges, gamification events, and info nodes. Processes
              are exported as JSON and loaded directly into the engine.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 mt-auto">
            <ZoomableImage src="/images/bachelor-thesis/editor.png" alt="Gamificated BPMN Editor interface" height={280} />
            <div className="flex gap-2">
              <Button asChild size="sm" variant="outline" className="flex-1">
                <TrackedLink href="http://gbpmneditor.mertendieckmann.de" trackingName="Bachelor - Editor Demo (card)" target="_blank" rel="noreferrer">
                  <ExternalLinkIcon /> Live Demo
                </TrackedLink>
              </Button>
              <Button asChild size="sm" variant="outline" className="flex-1">
                <TrackedLink href="https://github.com/MertenD/gamificated-bpmn-editor" trackingName="Bachelor - Editor GitHub (card)" target="_blank" rel="noreferrer">
                  <GithubIcon /> GitHub
                </TrackedLink>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-popover flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">BPMN Engine</CardTitle>
            <CardDescription>
              A browser-based runtime that executes gamified BPMN processes exported from the editor. Manages process
              state via Zustand, routes flow through gateways, and tracks gamification progress — XP, badges, coins —
              in real time as users complete activities.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 mt-auto">
            <ZoomableImage src="/images/bachelor-thesis/engine-overview.png" alt="Gamificated BPMN Engine runtime UI" height={280} />
            <div className="flex gap-2">
              <Button asChild size="sm" variant="outline" className="flex-1">
                <TrackedLink href="http://gbpmnengine.mertendieckmann.de" trackingName="Bachelor - Engine Demo (card)" target="_blank" rel="noreferrer">
                  <ExternalLinkIcon /> Live Demo
                </TrackedLink>
              </Button>
              <Button asChild size="sm" variant="outline" className="flex-1">
                <TrackedLink href="https://github.com/MertenD/gamificated-bpmn-engine" trackingName="Bachelor - Engine GitHub (card)" target="_blank" rel="noreferrer">
                  <GithubIcon /> GitHub
                </TrackedLink>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gamification elements */}
      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">Gamification Elements</CardTitle>
          <CardDescription>Five elements integrated into the BPMN runtime to increase engagement and motivation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {gamificationElements.map((el) => (
              <div key={el.title} className="flex flex-col gap-3">
                <ZoomableImage src={el.image} alt={el.alt} height={el.height} />
                <div>
                  <p className="font-headline text-sm text-foreground">{el.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{el.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">Node Architecture</CardTitle>
            <CardDescription>UML class diagram of the engine's node type system — 7 node types sharing a common interface</CardDescription>
          </CardHeader>
          <CardContent>
            <ZoomableImage src="/images/bachelor-thesis/nodes-architecture.png" alt="Node architecture UML class diagram" height={240} />
          </CardContent>
        </Card>

        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">Engine Process Flow</CardTitle>
            <CardDescription>Execution loop: import → run node → handle user input → advance to next node → repeat</CardDescription>
          </CardHeader>
          <CardContent>
            <ZoomableImage src="/images/bachelor-thesis/process-flow.png" alt="Engine execution process flow diagram" height={240} />
          </CardContent>
        </Card>
      </div>

      {/* Results */}
      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">Results</CardTitle>
          <CardDescription>Requirements coverage and user testing findings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {results.map((r) => (
              <div key={r.label} className="space-y-1">
                <p className="text-xs font-mono text-muted-foreground">{r.label}</p>
                <p className="text-sm font-headline text-foreground">{r.value}</p>
              </div>
            ))}
          </div>
          <Separator />
          <p className="text-sm text-muted-foreground">
            In user testing, every participant repeated the quiz process at least once — motivated by a hidden badge
            condition — demonstrating that gamification elements measurably increase engagement with business processes.
          </p>
        </CardContent>
      </Card>

      {/* Embedded thesis PDF */}
      <div className="w-full rounded-lg overflow-hidden border border-border">
        <iframe
          src="/Bachelorarbeit-Merten-Dieckmann.pdf"
          className="w-full"
          style={{ height: "80vh", minHeight: "600px" }}
          title="Bachelorarbeit Merten Dieckmann"
        />
      </div>
    </FileContentContainer>
  )
}
