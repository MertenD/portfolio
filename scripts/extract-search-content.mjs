import { readFileSync, writeFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")

const fileMap = {
  "readme":            "components/pages/readme-page.tsx",
  "cv":                "components/pages/cv-page.tsx",
  "master":            "components/pages/education/master-page.tsx",
  "bachelor":          "components/pages/education/bachelor-page.tsx",
  "biertunrier":       "components/pages/projects/bierturnier-page.tsx",
  "language-learning": "components/pages/projects/language-learning-page.tsx",
  "luzides-traeumen":  "components/pages/projects/luzides-traeumen-page.tsx",
  "muscle-group-api":  "components/pages/projects/muscle-group-api-page.tsx",
  "process-flow":      "components/pages/projects/process-flow-page.tsx",
  "imprint":           "components/pages/impressum-page.tsx",
}

const HTML_ENTITIES = { "&apos;": "'", "&amp;": "&", "&quot;": '"', "&lt;": "<", "&gt;": ">" }

function decodeEntities(str) {
  return str.replace(/&\w+;/g, (e) => HTML_ENTITIES[e] ?? e)
}

function extractText(src) {
  const texts = new Set()

  // Text nodes between JSX tags: >some prose text<
  for (const [, t] of src.matchAll(/>\s*([A-Za-zÄÖÜäöüß][^<>{}\n]{15,}?)\s*</gm)) {
    const clean = t.trim()
    if (clean.includes(" ") && !/^(import|export|const|function|return|class|interface|type )/.test(clean)) {
      texts.add(decodeEntities(clean))
    }
  }

  // JS object literal string values: description: "...", contentText: "..."
  for (const [, t] of src.matchAll(/(?:description|contentText|subtitle|title|text|label):\s*["'`]([^"'`\n]{15,})["'`]/gm)) {
    texts.add(decodeEntities(t.trim()))
  }

  // JSX attribute string values: description="..." contentText="..."
  for (const [, t] of src.matchAll(/(?:description|contentText|subtitle|title|buttonText|imageAlt|alt)=["']([^"'\n]{15,})["']/gm)) {
    texts.add(decodeEntities(t.trim()))
  }

  return [...texts].join(" ").toLowerCase()
}

const index = {}
for (const [id, relPath] of Object.entries(fileMap)) {
  try {
    const src = readFileSync(join(root, relPath), "utf-8")
    index[id] = extractText(src)
  } catch {
    console.warn(`Warning: could not read ${relPath}`)
    index[id] = ""
  }
}

writeFileSync(join(root, "content/search-index.json"), JSON.stringify(index, null, 2))
console.log(`Search index written with ${Object.keys(index).length} entries.`)
