import {FileContentContainer} from "@/components/portfolio/file-content-container";
import MuscleGroupAPIDemo from "@/components/demo/muscle-group-api-demo";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {GithubIcon} from "lucide-react";

export default function MuscleGroupAPIPage() {
  return <FileContentContainer
    filePath="projects/MuscleGroupAPI.php"
    title="Musclegroup Image Generator API"
    subtitle="Generates an anatomical image where requested muscle groups are dynamically highlighted on the human body in your color of choice."
    headerRight={
      <Button asChild size="sm" variant="default">
        <Link href="https://github.com/MertenD/musclegroup-image-generator" target="_blank" rel="noreferrer">
          <GithubIcon />
          GitHub
        </Link>
      </Button>
    }
  >
    <MuscleGroupAPIDemo />
  </FileContentContainer>
}