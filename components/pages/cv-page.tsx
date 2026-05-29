"use client"

import { DownloadIcon } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link"
import { Button } from "@/components/ui/button";
import { FileContentContainer } from "@/components/portfolio/file-content-container";

export default function CvPage() {
  return (
    <FileContentContainer
      filePath="CV.pdf"
      title={<>Curriculum Vitae</>}
      subtitle="Merten Dieckmann — Software Engineer"
      headerRight={
        <Button asChild size="sm" variant="default">
          <TrackedLink href="/CV-Merten-Dieckmann.pdf" trackingName="CV - Download" target="_blank" download>
            <DownloadIcon />
            Download
          </TrackedLink>
        </Button>
      }
    >
      <div className="w-full rounded-lg overflow-hidden border border-border">
        <iframe
          src="/CV-Merten-Dieckmann.pdf"
          className="w-full"
          style={{ height: "80vh", minHeight: "600px" }}
          title="CV Merten Dieckmann"
        />
      </div>
    </FileContentContainer>
  );
}
