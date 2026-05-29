"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileContentContainer } from "@/components/portfolio/file-content-container"
import { ZoomableImage } from "@/components/ui/zoomable-image"
import {Button} from "@/components/ui/button";
import {ExternalLinkIcon, GithubIcon} from "lucide-react";
import { TrackedLink } from "@/components/tracked-link"

const tech = ["Next.js", "TypeScript", "tRPC", "Prisma", "PostgreSQL", "Vercel AI SDK", "OpenRouter", "Inngest", "Polar", "PWA"]

const games = ["Flashcards", "Multiple Choice", "Reverse Choice", "Typing", "Scramble", "Matching", "Memory", "Hangman", "True / False", "Speed Match", "Mixed"]


export default function LanguageLearningPage() {
  return (
    <FileContentContainer
      filePath="projects/EasyLingu.tsx"
      title={
        <span className="flex items-center gap-3">
          <img
            src="/images/easylingu/icon.svg"
            alt="EasyLingu icon"
            width={36}
            height={36}
          />
          <span>EasyLingu</span>
        </span>
      }
      subtitle="AI-powered language learning — vocabulary, mini-games, and LLM conversation practice"
      headerRight={
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline">
            <TrackedLink href="https://easylingu.com" trackingName="EasyLingu - Website" target="_blank" rel="noreferrer">
              <ExternalLinkIcon />
              Website
            </TrackedLink>
          </Button>
          <Button asChild size="sm" variant="default">
            <TrackedLink href="https://github.com/MertenD/language-learning" trackingName="EasyLingu - GitHub" target="_blank" rel="noreferrer">
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
          <CardDescription>Full-stack language learning app with AI chat, spaced repetition, and 11 practice game modes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            Manage vocabulary in nested categories with word types, grammatical forms (conjugations, gender, plural),
            and example sentences. Each word is tracked through 5 spaced-repetition levels. Personal grammar notes are
            stored alongside vocabulary and fed into the AI for contextual corrections.
          </p>
          <p>
            The AI layer runs on OpenRouter via the Vercel AI SDK — generating full vocabulary sets with conjugations
            for any topic, personalising chat responses to the user&apos;s actual CEFR level and known words, and
            creating conversation scenarios derived from the user&apos;s real vocabulary and progress.
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
        <Card className="bg-popover flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">Vocabulary</CardTitle>
            <CardDescription>
              Nested word categories with grammatical forms, example sentences, CSV import/export, and bulk operations
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <ZoomableImage src="/images/easylingu/vocabulary.png" alt="EasyLingu vocabulary list" />
          </CardContent>
        </Card>

        <Card className="bg-popover flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">Practice Session</CardTitle>
            <CardDescription>
              Select a vocabulary set and game mode, then work through an adaptive session with a summary at the end
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <ZoomableImage src="/images/easylingu/practice.png" alt="EasyLingu practice session" />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">Practice Mini-Games</CardTitle>
          <CardDescription>Eleven interchangeable game modes — same vocabulary, different challenge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {games.map((g) => (
              <Badge key={g} variant="outline" className="font-mono text-xs">{g}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-popover flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">AI Chat Tutor</CardTitle>
            <CardDescription>
              Streaming LLM chat with structured responses: target-language conversation, native-language explanation,
              example follow-ups, and inline mistake corrections — personalised to the user&apos;s vocabulary and CEFR level
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <ZoomableImage src="/images/easylingu/chat.png" alt="EasyLingu AI chat tutor" />
          </CardContent>
        </Card>

        <Card className="bg-popover flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">AI Word Generation</CardTitle>
            <CardDescription>
              Enter a topic, choose word count and types — the LLM generates a complete vocabulary set with
              translations, conjugations, grammatical forms, and two example sentences per word
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <ZoomableImage src="/images/easylingu/ai-word-generation.png" alt="EasyLingu AI word generation" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-popover flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">RAG Scenarios</CardTitle>
            <CardDescription>
              AI generates conversation scenarios adapted to the user&apos;s real vocabulary, level, and grammar notes.
              Each scenario has a CEFR level, concrete action targets tracked live during the chat, and suggested follow-up phrases
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <ZoomableImage src="/images/easylingu/ai-scenario.png" alt="EasyLingu RAG scenarios" />
          </CardContent>
        </Card>

        <Card className="bg-popover flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">Dashboard</CardTitle>
            <CardDescription>
              XP, level, streaks, word-level breakdown (new / learning / mastered), recent activity feed,
              and AI-suggested scenarios based on current progress
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <ZoomableImage src="/images/easylingu/dashboard.png" alt="EasyLingu dashboard" />
          </CardContent>
        </Card>
      </div>
    </FileContentContainer>
  )
}
