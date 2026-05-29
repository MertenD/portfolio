import Image from "next/image";
import {FileContentContainer} from "@/components/portfolio/file-content-container";
import MuscleGroupAPIDemo from "@/components/demo/muscle-group-api-demo";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {GithubIcon, ExternalLinkIcon} from "lucide-react";
import { TrackedLink } from "@/components/tracked-link"

const stats = [
  { label: "Total requests", value: "500,000+" },
  { label: "Monthly requests", value: "~30,000" },
]

const tech = ["PHP", "Docker", "Linux", "RapidAPI"]

export default function MuscleGroupAPIPage() {
  return <FileContentContainer
    filePath="projects/MuscleGroupAPI.php"
    title={
      <span className="flex items-center gap-3">
        <Image
          src="/images/musclegroup/icon.png"
          alt="Musclegroup API icon"
          width={36}
          height={36}
          className="rounded-lg"
        />
        <span>Musclegroup Image Generator API</span>
      </span>
    }
    subtitle="Generates an anatomical image where requested muscle groups are dynamically highlighted on the human body in your color of choice."
    headerRight={
      <div className="flex gap-2">
        <Button asChild size="sm" variant="outline">
          <TrackedLink href="https://rapidapi.com/mertronlp/api/muscle-group-image-generator" trackingName="MuscleGroupAPI - RapidAPI" target="_blank" rel="noreferrer">
            <ExternalLinkIcon />
            RapidAPI
          </TrackedLink>
        </Button>
        <Button asChild size="sm" variant="default">
          <TrackedLink href="https://github.com/MertenD/musclegroup-image-generator" trackingName="MuscleGroupAPI - GitHub" target="_blank" rel="noreferrer">
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
        <CardDescription>Self-hosted REST API · deployed on a Linux VPS · listed on RapidAPI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <p>
          A REST API that generates anatomical muscle group highlight images on demand. Pass any combination of muscle
          groups and a custom color — the API returns a PNG with those muscles highlighted on a human body silhouette,
          optionally with a transparent background.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="space-y-1">
              <p className="text-xs font-mono text-muted-foreground">{s.label}</p>
              <p className="text-sm font-headline text-foreground">{s.value}</p>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <Badge key={t} variant="outline" className="font-mono text-xs">{t}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>

    <MuscleGroupAPIDemo />
  </FileContentContainer>
}