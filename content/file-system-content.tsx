import BierturnierPage from "@/components/pages/projects/bierturnier-page";
import {File, Folder} from "@/context/file-system-context";
import LanguageLearningPage from "@/components/pages/projects/language-learning-page";
import LuzidesTraeumenPage from "@/components/pages/projects/luzides-traeumen-page";
import MuscleGroupAPIPage from "@/components/pages/projects/muscle-group-api-page";
import ProcessFlowPage from "@/components/pages/projects/process-flow-page";
import ReadmePage from "@/components/pages/readme-page";

export const fileSystemContent: Array<File | Folder> = [
  {
    id: "portfolio",
    name: "portfolio",
    content: [
      {
        id: "projects",
        name: "projects",
        content: [
          {id: "biertunrier", name: "Bierturnier.rb", component: <BierturnierPage />},
          {id: "language-learning", name: "LanguageLearning.tsx", component: <LanguageLearningPage />},
          {id: "luzides-traeumen", name: "LuzidesTraeumen.tex", component: <LuzidesTraeumenPage />},
          {id: "muscle-group-api", name: "MuscleGroupAPI.php", component: <MuscleGroupAPIPage />},
          {id: "process-flow", name: "ProcessFlow.tsx", component: <ProcessFlowPage />}
        ]
      },
      {
        id: "education",
        name: "education",
        isInitiallyClosed: true,
        content: [
          {id: "master", name: "Master.tex", component: <div>Master</div>},
          {id: "bachelor", name: "Bachelor.tex", component: <div>Bachelor</div>},
        ]
      },
      {id: "readme", name: "README.md", component: <ReadmePage />}
    ]
  }
]