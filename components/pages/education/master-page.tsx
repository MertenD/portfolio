"use client"

import { GithubIcon, ExternalLinkIcon, DownloadIcon } from "lucide-react";
import { TrackedLink } from "@/components/tracked-link"
import { ZoomableImage } from "@/components/ui/zoomable-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileContentContainer } from "@/components/portfolio/file-content-container";

export default function MasterPage() {
  const contributions = [
    {
      title: "Classification Pipeline",
      description:
        "LLM-based pipeline that classifies BPMN activities as GDPR-critical or non-critical, with structured JSON output, ID validation and automatic retry for format correctness.",
    },
    {
      title: "Evaluation Framework",
      description:
        "Declarative YAML-configured framework with a standardised HTTP interface for comparing LLMs and algorithms reproducibly across multiple runs.",
    },
    {
      title: "Labeling Tool",
      description:
        "Full-stack web app for creating and maintaining labeled BPMN test datasets across multiple domains and languages, used to build the evaluation dataset.",
    },
  ]

  const results = [
    { label: "Models evaluated", value: "13" },
    { label: "Test cases", value: "25" },
    { label: "Models reaching F1 ≥ 0.80", value: "9 / 13" },
    { label: "Best F1-Score", value: "~0.87 (Qwen3-235B, GPT-OSS-20B)" },
  ]

  return (
    <FileContentContainer
      filePath="education/Master.tex"
      title={<>Master&apos;s Thesis</>}
      subtitle="Ulm University · Software Engineering M.Sc. · Oct 2023 – Oct 2025 · Grade: 1.0"
      headerRight={
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline">
            <TrackedLink href="/Masterarbeit-Merten-Dieckmann.pdf" trackingName="Master - Download Thesis" target="_blank" download>
              <DownloadIcon />
              Thesis
            </TrackedLink>
          </Button>
          <Button asChild size="sm" variant="outline">
            <TrackedLink href="https://gripl.merten.tech" trackingName="Master - Live Demo" target="_blank" rel="noreferrer">
              <ExternalLinkIcon />
              Live Demo
            </TrackedLink>
          </Button>
          <Button asChild size="sm" variant="default">
            <TrackedLink href="https://github.com/MertenD/gripl-master-thesis" trackingName="Master - GitHub" target="_blank" rel="noreferrer">
              <GithubIcon />
              GitHub
            </TrackedLink>
          </Button>
        </div>
      }
    >
      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">
            Identifying GDPR-Critical Activities in Business Processes Using Large Language Models
          </CardTitle>
          <CardDescription>GRIPL — GDPR Risk Identification in Processes using LLMs</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            Business processes in organisations frequently involve the processing of personal data, making GDPR
            compliance a critical concern. Manual review of hundreds of concurrent processes is impractical and
            error-prone — with fines of up to €20 million or 4% of annual global turnover for non-compliance.
          </p>
          <p>
            This thesis investigates whether LLMs can reliably identify GDPR-critical activities in BPMN process
            models. It introduces a full classification pipeline, an extensible evaluation framework, and a labeling
            tool, then benchmarks 13 models across 25 test cases with 5 repetitions each.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">Tech Stack</CardTitle>
            <CardDescription>Backend · Frontend · Infrastructure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs font-mono text-muted-foreground">Backend</p>
              <div className="flex flex-wrap gap-2">
                {["Kotlin", "Spring Boot", "WebFlux", "LangChain4j", "PostgreSQL", "Docker"].map((t) => (
                  <Badge key={t} variant="outline" className="font-mono text-xs">{t}</Badge>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-mono text-muted-foreground">Frontend</p>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "TypeScript", "bpmn-js", "Recharts", "Docker"].map((t) => (
                  <Badge key={t} variant="outline" className="font-mono text-xs">{t}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">Key Contributions</CardTitle>
            <CardDescription>Three deliverables developed as part of this thesis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contributions.map((c) => (
              <div key={c.title} className="space-y-1">
                <p className="text-sm font-headline text-foreground">{c.title}</p>
                <p className="text-sm text-muted-foreground">{c.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">Classification Pipeline</CardTitle>
          <CardDescription>BPMN model of the full LLM classification pipeline with retry logic</CardDescription>
        </CardHeader>
        <CardContent>
          <ZoomableImage
            src="/images/master-thesis/classification-pipeline-diagram-en.png"
            alt="Classification pipeline BPMN diagram"
            height={220}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">GRIPL Analysis Tool</CardTitle>
            <CardDescription>Sandbox view — GDPR-critical activities highlighted in red after LLM analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ZoomableImage
              src="/images/master-thesis/sandbox-analyzed-model-annotated.png"
              alt="GRIPL sandbox with GDPR-critical BPMN elements highlighted"
              height={260}
            />
          </CardContent>
        </Card>

        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">Labeling Tool</CardTitle>
            <CardDescription>Custom-built web app for creating and annotating GDPR-labeled BPMN test datasets</CardDescription>
          </CardHeader>
          <CardContent>
            <ZoomableImage
              src="/images/master-thesis/labeling-editor.png"
              alt="Labeling tool editor with BPMN diagram and label panel"
              height={260}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">Evaluation Framework</CardTitle>
          <CardDescription>YAML-configured, reproducible LLM benchmarking pipeline</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            Declarative YAML configuration defines models, datasets, repetitions, seed, and HTTP endpoint — swap any
            LLM or classification algorithm without touching the code.
          </p>
          <p>
            A standardised HTTP interface decouples the framework from the classifier. Each model runs 5 repetitions
            with a fixed seed; results are aggregated as mean ± std dev across runs. Evaluations can be exported as
            JSON or Markdown for reproducible reporting.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">Architecture</CardTitle>
            <CardDescription>EvaluationController → MultiEvaluationRunner → EvaluationRunner → HttpEvaluator → LLM</CardDescription>
          </CardHeader>
          <CardContent>
            <ZoomableImage
              src="/images/master-thesis/evaluation-architecture.png"
              alt="Evaluation framework component diagram"
              height={240}
            />
          </CardContent>
        </Card>

        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">Configuration</CardTitle>
            <CardDescription>Form-based config — define models, pick datasets, set repetitions and concurrency, then launch the run</CardDescription>
          </CardHeader>
          <CardContent>
            <ZoomableImage
              src="/images/master-thesis/evaluation-config.png"
              alt="Evaluation framework configuration UI"
              height={240}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">Results by Model</CardTitle>
            <CardDescription>Per-model dashboard: radar chart (Accuracy / Precision / Recall / F1), confusion matrix, and run-by-run comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ZoomableImage
              src="/images/master-thesis/evaluation-result-model.png"
              alt="Evaluation results per model with radar and bar charts"
              height={260}
            />
          </CardContent>
        </Card>

        <Card className="bg-popover">
          <CardHeader className="pb-3">
            <CardTitle className="font-headline text-base">Results by Test Case</CardTitle>
            <CardDescription>BPMN diagram with correctly identified (green) and false-positive (red) activities highlighted, plus model reasoning per element</CardDescription>
          </CardHeader>
          <CardContent>
            <ZoomableImage
              src="/images/master-thesis/evaluation-result-testcase.png"
              alt="Evaluation results per test case with annotated BPMN diagram"
              height={260}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-popover">
        <CardHeader className="pb-3">
          <CardTitle className="font-headline text-base">Results</CardTitle>
          <CardDescription>Systematic evaluation across 13 LLMs — recall-oriented metric target F1 ≥ 0.80</CardDescription>
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
          <ZoomableImage
            src="/images/master-thesis/evaluation_f1_scores.png"
            alt="F1 scores of all 13 evaluated LLMs"
            height={280}
          />
          <p className="text-xs text-muted-foreground">
            Smaller models (≤25B) matched larger ones, making them attractive for on-premises deployments.
            European models (Mistral) were competitive but trailed top international models on average.
          </p>
        </CardContent>
      </Card>
      <div className="w-full rounded-lg overflow-hidden border border-border">
        <iframe
          src="/Masterarbeit-Merten-Dieckmann.pdf"
          className="w-full"
          style={{ height: "80vh", minHeight: "600px" }}
          title="Masterarbeit Merten Dieckmann"
        />
      </div>
    </FileContentContainer>
  )
}
