"use client"

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {GithubIcon} from "lucide-react";
import {useFileSystem} from "@/context/file-system-context";
import {FileId} from "@/content/file-system-content";

export default function ReadmePage() {

  const { openFileById } = useFileSystem()

  const projects = [
    {
      name: "ProcessFlow",
      onOpen: () => openFileById(FileId.ProcessFlow),
      description:
        "SaaS platform for building and managing gamified business processes.",
      tech: ["Next.js", "TypeScript", "Postgres", "Docker"],
    },
    {
      name: "Lucid Dreaming Book",
      onOpen: () => openFileById(FileId.LuzidesTraeumen),
      description:
        'Website for my book “Kontrolliere Deine Träume: Ein praktischer Leitfaden zum Luziden Träumen”.',
      tech: ["Next.js", "TypeScript"],
    },
    {
      name: "BierTurnier",
      onOpen: () => openFileById(FileId.Bierturnier),
      description:
        "App for creating and tracking beer pong tournaments together with friends.",
      tech: ["React", "TypeScript"],
    },
  ]

  return (
    <section className="flex-1 min-h-0 h-full w-full p-4 md:p-8 overflow-y-auto">
      <div className="w-full max-w-4xl space-y-6">
        <header className="space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs text-muted-foreground">README.md</p>
              <h1 className="font-headline text-2xl md:text-3xl tracking-tight text-foreground">
                Hey there! I&apos;m <span className="text-primary">Merten</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Fullstack Software Engineer @ Mercedes-Benz Tech Innovation
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="default">
                <Link href="https://github.com/MertenD" target="_blank" rel="noreferrer">
                  <GithubIcon />
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">About</CardTitle>
            <CardDescription>
              Full‑stack development, modern web stacks, and product-focused work.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Experienced in full‑stack development with modern web technologies.</li>
              <li>Recently completed my Master&apos;s degree in Software Engineering.</li>
              <li>
                Building use case-specific, custom generative AI solutions in my day job.
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">Technologies</CardTitle>
            <CardDescription>
              A snapshot of my stack (varies by project and use case).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <p>
                <img src="https://skillicons.dev/icons?i=ts,nodejs,react,next,postgres,tailwind,docker" />
              </p>

              <p>
                <img src="https://skillicons.dev/icons?i=idea,kotlin,java,spring,py,githubactions,kubernetes" />
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">Current projects</CardTitle>
            <CardDescription>
              A small selection — details live in the “projects/” folder.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((p, idx) => (
              <div key={p.name} className="space-y-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-headline text-sm text-foreground truncate">{p.name}</p>
                    <p className="text-sm text-muted-foreground">{p.description}</p>
                  </div>
                  <Button size="sm" variant="link-secondary" className="shrink-0" onClick={p.onOpen}>
                    See project
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Badge key={t} variant="outline" className="font-mono text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
                {idx !== projects.length - 1 && <Separator className="bg-border" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}