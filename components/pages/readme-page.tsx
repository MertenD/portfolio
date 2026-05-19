"use client"

import Link from "next/link";
import Image from "next/image";

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
import { FileContentContainer } from "@/components/portfolio/file-content-container";

export default function ReadmePage() {

  const { openFileById } = useFileSystem()

  const projects = [
    {
      name: "Musclegroup Image Generator API",
      icon: "/images/musclegroup/icon.png",
      onOpen: () => openFileById(FileId.MuscleGroupAPI),
      description:
        "API that generates anatomical muscle group highlight images in custom colors. 500,000+ total requests, ~30,000/month.",
      tech: ["PHP", "Docker", "Linux", "RapidAPI"],
    },
    {
      name: "EasyLingu",
      icon: "/images/easylingu/icon.svg",
      onOpen: () => openFileById(FileId.LanguageLearning),
      description:
        "Language learning app with vocabulary, mini-games, and AI features: auto-generated vocabulary sets, LLM chat, and RAG-powered practice scenarios.",
      tech: ["Next.js", "TypeScript", "tRPC", "PostgreSQL", "LLMs", "RAG", "Docker"],
    },
    {
      name: "ProcessFlow",
      icon: "/images/process-flow/icon.png",
      onOpen: () => openFileById(FileId.ProcessFlow),
      description:
        "Web app for building and executing gamified business processes — drag-and-drop workflow editor, process execution engine, plugin system, and live monitoring.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Docker"],
    },
    {
      name: "BierTurnier",
      icon: "/images/bierturnier/icon.png",
      onOpen: () => openFileById(FileId.Bierturnier),
      description:
        "Web app for creating and tracking party game tournaments with friends — tournament system and account management.",
      tech: ["Next.js", "TypeScript", "Supabase", "Docker"],
    },
    {
      name: "Lucid Dreaming Book",
      icon: "/images/lucid-dreaming/icon.png",
      onOpen: () => openFileById(FileId.LuzidesTraeumen),
      description:
        'Self-published practical guide to lucid dreaming ("Kontrolliere Deine Träume") via Amazon KDP, with a matching Next.js landing page.',
      tech: ["Next.js", "TypeScript", "Amazon KDP"],
    },
  ]

  return (
    <FileContentContainer
      filePath="README.md"
      title={
        <>
          Hey there! I&apos;m <span className="text-primary">Merten</span>
        </>
      }
      subtitle="Fullstack Software Engineer @ Mercedes-Benz Tech Innovation"
      headerRight={
        <Button asChild size="sm" variant="default">
          <Link href="https://github.com/MertenD" target="_blank" rel="noreferrer">
            <GithubIcon />
            GitHub
          </Link>
        </Button>
      }
    >
      <Card className="bg-popover">
        <CardHeader>
          <CardTitle className="font-headline text-base">About</CardTitle>
          <CardDescription>
            Full‑stack development, modern web stacks, and product-focused work.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Image
              src="/images/merten.jpg"
              alt="Merten Dieckmann"
              width={120}
              height={120}
              className="rounded-full shrink-0 object-cover"
            />
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>4+ years of professional experience building fullstack and AI-driven applications.</li>
              <li>Master&apos;s degree in Software Engineering from Ulm University (Grade: 1.0).</li>
              <li>Passionate about shipping real products — from enterprise-grade internal tools to self-hosted side projects with 500,000+ real-world API requests.</li>
            </ul>
          </div>
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
              <img src="https://skillicons.dev/icons?i=ts,nodejs,react,next,angular,postgres,tailwind,docker" />
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
            A small selection — details live in the "projects/" folder.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {projects.map((p, idx) => (
            <div key={p.name} className="space-y-2">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 pb-2">
                    {"icon" in p && p.icon && (
                      <Image src={p.icon} alt={`${p.name} icon`} width={18} height={18} className="rounded-none shrink-0" />
                    )}
                    <p className="font-headline text-sm text-foreground truncate">{p.name}</p>
                  </div>
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
    </FileContentContainer>
  )
}