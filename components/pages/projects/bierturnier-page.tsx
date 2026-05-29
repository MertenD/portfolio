"use client"

import Image from "next/image"
import { GithubIcon, ExternalLinkIcon, UsersIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileContentContainer } from "@/components/portfolio/file-content-container"
import { ZoomableImage } from "@/components/ui/zoomable-image"
import { TrackedLink } from "@/components/tracked-link"

const tech = ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Docker", "PWA", "i18n"]

const features = [
  {
    title: "Tournaments",
    description: "Browse all tournaments filtered by state — upcoming, active, or finished. Each tournament shows its scheduled date and current participant count.",
    image: "/images/bierturnier/tournaments.png",
    alt: "BierTurnier tournament list",
    height: 280,
  },
  {
    title: "Create Tournament",
    description: "Schedule a new tournament with a name and date. The creator automatically becomes the tournament manager and can control its lifecycle.",
    image: "/images/bierturnier/create-tournament.png",
    alt: "BierTurnier create tournament form",
    height: 280,
  },
  {
    title: "Invite Players",
    description: "Share a join link or let players scan a QR code to join a tournament directly on their phone — no manual setup required.",
    image: "/images/bierturnier/invite-players.png",
    alt: "BierTurnier invite players via QR code",
    height: 280,
  },
  {
    title: "Games",
    description: "Track all games in a tournament with team matchups, scores, and game states. Add new games and record results as the tournament progresses.",
    image: "/images/bierturnier/games.png",
    alt: "BierTurnier games list",
    height: 280,
  },
  {
    title: "Leaderboard",
    description: "Live standings showing wins, total games played, and win rate per player — updated automatically as game results are recorded.",
    image: "/images/bierturnier/leaderboard.png",
    alt: "BierTurnier leaderboard with player rankings",
    height: 280,
  },
]

export default function BierturnierPage() {
  return (
    <FileContentContainer
      filePath="projects/BierTurnier.tsx"
      title={
        <span className="flex items-center gap-3">
          <Image
            src="/images/bierturnier/icon.png"
            alt="BierTurnier icon"
            width={36}
            height={36}
            className="rounded-none"
          />
          <span>BierTurnier</span>
        </span>
      }
      subtitle="Beerpong tournament manager — built together with friends"
      headerRight={
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline">
            <TrackedLink href="https://bierturnier.de" trackingName="BierTurnier - Website" target="_blank" rel="noreferrer">
              <ExternalLinkIcon />
              Website
            </TrackedLink>
          </Button>
          <Button asChild size="sm" variant="default">
            <TrackedLink href="https://github.com/MarkusThielker/bier-turnier" trackingName="BierTurnier - GitHub" target="_blank" rel="noreferrer">
              <GithubIcon />
              GitHub
            </TrackedLink>
          </Button>
        </div>
      }
    >
      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">Overview</CardTitle>
          <CardDescription>Full-stack tournament management for beerpong events</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            BierTurnier lets you create and manage beerpong tournaments end-to-end — schedule events, track game
            results, view live leaderboards, and invite players instantly via QR-code share links. Built as a
            Progressive Web App, it installs directly on mobile for use at the table.
          </p>
          <p>
            Developed as a team of three with Emilija Kastratović and Markus Thielker — covering the full product
            lifecycle from database design and Supabase auth to Docker containerisation, multi-platform builds, and
            GitHub Actions CI/CD. A real exercise in collaborative software engineering from idea to deployment.
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
              <CardDescription>{f.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <ZoomableImage src={f.image} alt={f.alt} height={f.height} />
            </CardContent>
          </Card>
        ))}

        <Card className="bg-popover flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base flex items-center gap-2">
              <UsersIcon className="size-4 text-muted-foreground" />
              Built as a Team
            </CardTitle>
            <CardDescription>Collaborative development from idea to production</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground mt-auto">
            <p>
              BierTurnier was designed, built, and shipped by three people — gaining hands-on experience coordinating
              features, reviewing each other&apos;s code, and making architectural decisions together.
            </p>
            <div className="space-y-1 pt-1">
              {["Merten Dieckmann", "Emilija Kastratović", "Markus Thielker"].map((name) => (
                <p key={name} className="text-xs font-mono text-foreground">{name}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </FileContentContainer>
  )
}
