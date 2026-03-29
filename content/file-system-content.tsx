import BierturnierPage from "@/components/pages/projects/bierturnier-page";
import {File, Folder} from "@/context/file-system-context";
import LanguageLearningPage from "@/components/pages/projects/language-learning-page";
import LuzidesTraeumenPage from "@/components/pages/projects/luzides-traeumen-page";
import MuscleGroupAPIPage from "@/components/pages/projects/muscle-group-api-page";
import ProcessFlowPage from "@/components/pages/projects/process-flow-page";
import ReadmePage from "@/components/pages/readme-page";
import MasterPage from "@/components/pages/education/master-page";
import BachelorPage from "@/components/pages/education/bachelor-page";
import FindmePage from "@/components/pages/projects/findme-page";

export enum FileId {
  Bierturnier = "biertunrier",
  LanguageLearning = "language-learning",
  LuzidesTraeumen = "luzides-traeumen",
  MuscleGroupAPI = "muscle-group-api",
  ProcessFlow = "process-flow",
  Findme = "findme",
  Master = "master",
  Bachelor = "bachelor",
  Readme = "readme"
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
          {id: FileId.Bierturnier, name: "Bierturnier.rb", component: <BierturnierPage />},
          {id: FileId.LanguageLearning, name: "LanguageLearning.tsx", component: <LanguageLearningPage />},
          {id: FileId.LuzidesTraeumen, name: "LuzidesTraeumen.tex", component: <LuzidesTraeumenPage />},
          {id: FileId.MuscleGroupAPI, name: "MuscleGroupAPI.php", component: <MuscleGroupAPIPage />},
          {id: FileId.ProcessFlow, name: "ProcessFlow.tsx", component: <ProcessFlowPage />},
          {id: FileId.Findme, name: "findme.tsx", component: <FindmePage />}
        ]
      },
      {
        id: "education",
        name: "education",
        isInitiallyClosed: true,
        content: [
          {id: FileId.Master, name: "Master.tex", component: <MasterPage />},
          {id: FileId.Bachelor, name: "Bachelor.tex", component: <BachelorPage />},
        ]
      },
      {id: FileId.Readme, name: "README.md", component: <ReadmePage />}
    ]
  }
]