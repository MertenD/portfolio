import BierturnierPage from "@/components/pages/projects/bierturnier-page";
import {File, Folder} from "@/context/file-system-context";
import LanguageLearningPage from "@/components/pages/projects/language-learning-page";
import LuzidesTraeumenPage from "@/components/pages/projects/luzides-traeumen-page";
import MuscleGroupAPIPage from "@/components/pages/projects/muscle-group-api-page";
import ProcessFlowPage from "@/components/pages/projects/process-flow-page";
import ReadmePage from "@/components/pages/readme-page";
import MasterPage from "@/components/pages/education/master-page";
import BachelorPage from "@/components/pages/education/bachelor-page";
import ImprintPage from "@/components/pages/imprint-page";
import PrivacyPolicyPage from "@/components/pages/privacy-policy-page";
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
  Cv = "cv",
  Privacy = "privacy"
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
          },
          {
            id: FileId.LanguageLearning, name: "EasyLingu.tsx", component: <LanguageLearningPage />,
            keywords: ["language learning", "vocabulary", "spaced repetition", "ai", "chat", "flashcards", "openrouter", "vercel ai sdk", "trpc", "inngest", "polar", "subscriptions"],
          },
          {
            id: FileId.LuzidesTraeumen, name: "LuzidesTraeumen.tex", component: <LuzidesTraeumenPage />,
            keywords: ["book", "lucid dreaming", "amazon", "kdp", "landing page", "publishing", "träumen"],
          },
          {
            id: FileId.MuscleGroupAPI, name: "MuscleGroupAPI.php", component: <MuscleGroupAPIPage />,
            keywords: ["api", "image", "php", "rapidapi", "muscle", "gym", "anatomy", "highlight"],
          },
          {
            id: FileId.ProcessFlow, name: "ProcessFlow.tsx", component: <ProcessFlowPage />,
            keywords: ["process", "workflow", "gamification", "bpmn", "drag drop", "monitoring", "plugin", "supabase", "real-time"],
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
          },
          {
            id: FileId.Bachelor, name: "Bachelor.tex", component: <BachelorPage />,
            keywords: ["bachelor", "thesis", "gamification", "bpmn", "editor", "engine", "react flow", "zustand", "xp", "badges", "challenges", "ulm"],
          },
        ]
      },
      {
        id: FileId.Readme, name: "README.md", component: <ReadmePage />,
        keywords: ["about", "profile", "mercedes-benz", "fullstack", "engineer", "technologies", "stack"],
      },
      {
        id: FileId.Cv, name: "CV.pdf", component: <CvPage />,
        keywords: ["resume", "curriculum vitae", "lebenslauf", "experience", "career"],
      },
      {
        id: FileId.Imprint, name: "Imprint.md", component: <ImprintPage />,
        keywords: ["imprint", "impressum", "legal", "contact"],
      },
      {
        id: FileId.Privacy, name: "Privacy.md", component: <PrivacyPolicyPage />,
        keywords: ["datenschutz", "privacy", "dsgvo", "gdpr", "cookies", "tracking", "analytics", "legal"],
      },
    ]
  }
]