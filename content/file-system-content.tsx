import BierturnierPage from "@/components/pages/projects/bierturnier-page";
import {File, Folder} from "@/context/file-system-context";
import LanguageLearningPage from "@/components/pages/projects/language-learning-page";
import LuzidesTraeumenPage from "@/components/pages/projects/luzides-traeumen-page";
import MuscleGroupAPIPage from "@/components/pages/projects/muscle-group-api-page";
import ProcessFlowPage from "@/components/pages/projects/process-flow-page";
import ReadmePage from "@/components/pages/readme-page";
import MasterPage from "@/components/pages/education/master-page";
import BachelorPage from "@/components/pages/education/bachelor-page";
import ImpressumPage from "@/components/pages/impressum-page";
import CvPage from "@/components/pages/cv-page";

export enum FileId {
  Bierturnier = "biertunrier",
  LanguageLearning = "language-learning",
  LuzidesTraeumen = "luzides-traeumen",
  MuscleGroupAPI = "muscle-group-api",
  ProcessFlow = "process-flow",
  Master = "master",
  Bachelor = "bachelor",
  Readme = "readme",
  Imprint = "imprint",
  Cv = "cv"
}

export const fileSystemContent: Array<File | Folder> = [
  {
    id: "portfolio",
    name: "portfolio",
    content: [
      {
        id: "projects",
        name: "projects",
        content: [
          {
            id: FileId.Bierturnier, name: "Bierturnier.rb", component: <BierturnierPage />,
            keywords: ["tournament", "beerpong", "beer pong", "party", "supabase", "pwa", "qr code", "leaderboard", "friends", "team"],
            searchableText: "bierturnier beer pong tournament party friends team leaderboard qr code invite supabase pwa next.js typescript docker i18n international",
          },
          {
            id: FileId.LanguageLearning, name: "EasyLingu.tsx", component: <LanguageLearningPage />,
            keywords: ["language learning", "vocabulary", "spaced repetition", "ai", "chat", "flashcards", "openrouter", "vercel ai sdk", "trpc", "inngest", "polar", "subscriptions"],
            searchableText: "easylingu language learning vocabulary nested categories grammatical forms conjugations gender plural example sentences spaced repetition five levels ai chat tutor streaming llm cefr level corrections scenarios rag openrouter vercel ai sdk trpc inngest polar subscriptions pwa xp streaks dashboard",
          },
          {
            id: FileId.LuzidesTraeumen, name: "LuzidesTraeumen.tex", component: <LuzidesTraeumenPage />,
            keywords: ["book", "lucid dreaming", "amazon", "kdp", "landing page", "publishing", "träumen"],
            searchableText: "lucid dreaming book self-publishing amazon kdp kontrolliere deine träume latex landing page next.js conversion marketing",
          },
          {
            id: FileId.MuscleGroupAPI, name: "MuscleGroupAPI.php", component: <MuscleGroupAPIPage />,
            keywords: ["api", "image", "php", "rapidapi", "muscle", "gym", "anatomy", "highlight"],
            searchableText: "muscle group image generator api php docker linux rapidapi 500000 requests anatomy highlight colors custom",
          },
          {
            id: FileId.ProcessFlow, name: "ProcessFlow.tsx", component: <ProcessFlowPage />,
            keywords: ["process", "workflow", "gamification", "bpmn", "drag drop", "monitoring", "plugin", "supabase", "real-time"],
            searchableText: "processflow web app gamified business processes workflow editor execution engine plugin system live monitoring drag drop supabase real-time rewards",
          },
        ]
      },
      {
        id: "education",
        name: "education",
        isInitiallyClosed: true,
        content: [
          {
            id: FileId.Master, name: "Master.tex", component: <MasterPage />,
            keywords: ["master", "thesis", "gdpr", "llm", "large language model", "bpmn", "classification", "gripl", "kotlin", "spring boot", "evaluation", "ai", "artificial intelligence", "ulm"],
            searchableText: "master thesis gripl gdpr compliance large language model llm bpmn process model classification automated evaluation pipeline labeling tool annotation ulm university kotlin spring boot ai artificial intelligence 1.0 grade",
          },
          {
            id: FileId.Bachelor, name: "Bachelor.tex", component: <BachelorPage />,
            keywords: ["bachelor", "thesis", "gamification", "bpmn", "editor", "engine", "react flow", "zustand", "xp", "badges", "challenges", "ulm"],
            searchableText: "bachelor thesis gamified bpmn process editor execution engine drag drop react flow zustand xp experience points badges challenges reward system ulm university",
          },
        ]
      },
      {
        id: FileId.Readme, name: "README.md", component: <ReadmePage />,
        keywords: ["about", "profile", "mercedes-benz", "fullstack", "engineer", "technologies", "stack"],
        searchableText: "fullstack software engineer mercedes-benz tech innovation 4 years professional experience master's degree ulm university angular kotlin java spring python github actions kubernetes",
      },
      {
        id: FileId.Cv, name: "CV.pdf", component: <CvPage />,
        keywords: ["resume", "curriculum vitae", "lebenslauf", "experience", "career"],
        searchableText: "curriculum vitae experience career software engineer work history",
      },
      {
        id: FileId.Imprint, name: "Imprint.md", component: <ImpressumPage />,
        keywords: ["imprint", "impressum", "legal", "contact"],
        searchableText: "imprint impressum legal contact information",
      },
    ]
  }
]