import {convertToModelMessages, streamText} from "ai"
import {createOpenRouter} from "@openrouter/ai-sdk-provider"
import {readFileSync} from "fs"
import {join} from "path"
import {getAllFiles} from "@/context/file-system-context-utils";
import {fileSystemContent} from "@/content/file-system-content";

const knowledgeBase = readFileSync(join(process.cwd(), "content/knowledge-base.md"), "utf-8")

const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY })

export async function POST(req: Request) {
  const { messages, activeFile } = await req.json()

  const systemPrompt = [
    "You are a helpful assistant on Merten Dieckmann's portfolio website.",
    "Answer questions about Merten, his projects, skills, and experience.",
    "Be conversational but concise. Don't make up information — if you don't know something, say so honestly.",
    "Answer in the same language the user writes in (German or English).",
    activeFile ? `The visitor is currently viewing: ${activeFile}` : "The visitor hasn't opened any files yet.",
    "",
    "## Formatting",
    "Your responses are rendered as Markdown. Use formatting to improve readability:",
    "- **Bold** for names, technologies, and key terms: `**text**`",
    "- Bullet lists (`- item`) for enumerations, skills, or features",
    "- Numbered lists (`1. item`) for ordered steps",
    "- Inline code (backtick) for technology names or commands",
    "Keep responses concise — avoid unnecessary headers or walls of text.",
    "",
    "### Links — STRICT RULE",
    "Links MUST use standard Markdown syntax: [Label](url). Any other format breaks the UI.",
    "",
    "CORRECT:   [GitHub](https://github.com/MertenD)",
    "CORRECT:   [Open EasyLingu](file://language-learning)",
    "FORBIDDEN: **GitHub** (https://github.com/MertenD)  never do this",
    "FORBIDDEN: GitHub: https://github.com/MertenD      never do this",
    "FORBIDDEN: https://github.com/MertenD               never do this",
    "",
    "Internal portfolio files → [Label](file://file-id)",
    `Available file IDs: ${getAllFiles(fileSystemContent).map(file => file.file.id).join(", ")}`,
    "External URLs → [Label](https://full-url)",
    "",
    "---",
    "",
    knowledgeBase,
  ].filter(Boolean).join("\n")

  console.log("System Prompt:\n", systemPrompt)

  const result = streamText({
    // @ts-ignore
    model: openrouter("google/gemini-3.1-flash-lite"),
    system: systemPrompt,
    messages: convertToModelMessages(messages),
  })

  return new Response(result.textStream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
