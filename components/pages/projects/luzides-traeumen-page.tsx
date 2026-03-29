import Image from "next/image"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {ExternalLink, Star, BookOpen, Code2} from "lucide-react"
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card"
import Link from "next/link"
import {Fragment} from "react";

export default function LuzidesTraeumenPage() {
  return (
    <section className="flex-1 min-h-0 h-full w-full p-4 md:p-8 overflow-y-auto">
      <div className="w-full max-w-4xl space-y-6">
        <header className="space-y-2">
          <p className="font-mono text-xs text-muted-foreground">projects/lucid-dreaming</p>
          <h1 className="font-headline text-2xl md:text-3xl tracking-tight text-foreground">
            Lucid Dreaming
          </h1>
          <p className="text-sm text-muted-foreground">
            A project combining two passions: writing a book about lucid dreaming and building its landing page.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* The Book Section */}
          <ProjectCard
            title="The Book"
            icon={<BookOpen className="w-4 h-4"/>}
            description="A practical guide to lucid dreaming."
            imageNode={
              <div className="flex justify-center bg-muted/30 rounded-lg p-4 h-[266px]">
                <Image
                  src="/images/lucid-dreaming/lucid-dreaming-book-3d.png"
                  alt="3D Book Cover"
                  width={500}
                  height={266}
                  className="object-contain p-2"
                />
              </div>
            }
            contentText="This book offers a simple and practical entry into the world of lucid dreaming. With step-by-step instructions and many exercises, it's designed for both beginners and advanced dreamers."
            badges={[
              <Badge variant="outline" className="font-mono text-xs">Self-Publishing</Badge>,
              <Badge variant="outline" className="font-mono text-xs">Amazon KDP</Badge>,
              <Badge variant="outline" className="font-mono text-xs">Amazon Ads</Badge>,
              <Badge variant="outline" className="font-mono text-xs">LaTeX</Badge>,
            ]}
            buttonLink="https://www.amazon.de/Kontrolliere-Deine-Tr%C3%A4ume-praktischer-Leidfaden/dp/B0D8LHZ2X6"
            buttonText="View on Amazon"
            buttonVariant="default"
          />

          {/* The Landing Page Section */}
          <ProjectCard
            title="The Landing Page"
            icon={<Code2 className="w-4 h-4"/>}
            description="Promotional website optimized for conversion."
            imageNode={
              <div className="flex justify-center bg-muted/30 rounded-lg p-4 relative h-[266px]">
                <Image
                  src="/images/lucid-dreaming/lucid-dreaming-landing-desktop-screenshot.png"
                  alt="Desktop Screenshot"
                  fill
                  className="object-contain p-2"
                />
              </div>
            }
            contentText="To market the book, I built a modern, responsive landing page focused on performance and conversion."
            badges={[
              <Badge variant="outline" className="font-mono text-xs">Next.js 15</Badge>,
              <Badge variant="outline" className="font-mono text-xs">React</Badge>,
              <Badge variant="outline" className="font-mono text-xs">TypeScript</Badge>,
              <Badge variant="outline" className="font-mono text-xs">Docker</Badge>
            ]}
            buttonLink="https://luzides-traeumen-buch.de"
            buttonText="Visit Landing Page"
            buttonVariant="secondary"
          />
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
                       title,
                       icon,
                       description,
                       imageNode,
                       contentText,
                       badges,
                       buttonLink,
                       buttonText,
                       buttonVariant = "default",
                     }: {
  title: string
  icon: React.ReactNode
  description: string
  imageNode: React.ReactNode
  contentText: string
  badges: React.ReactNode[]
  buttonLink: string
  buttonText: string
  buttonVariant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
}) {
  return (
    <Card className="bg-popover flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="font-headline text-base flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 gap-4 text-sm justify-between">
        <div className="flex flex-col gap-4">
          {imageNode}
          <p className="text-muted-foreground">{contentText}</p>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <Fragment key={index}>{badge}</Fragment>
          ))}
          </div>
          <Button asChild className="w-full mt-auto" variant={buttonVariant} size="sm">
            <Link href={buttonLink} target="_blank">
              {buttonText} <ExternalLink className="w-4 h-4 ml-2"/>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}