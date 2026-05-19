# Portfolio

A personal portfolio built as a VS Code-inspired IDE. Projects, education, and CV are presented as files in a navigable file tree — opening them in tabs just like a code editor.

<img src="./public/images/portfolio-overview.png" alt="Portfolio Overview" width="850" />

## Features

- **File system metaphor** — sidebar explorer with expandable folders, open files as draggable tabs
- **Full-text search** — searches file names, keyword metadata, and extracted page content; shows highlighted snippets
- **Resizable panels** — adjustable sidebar width (hidden on mobile, modal overlay on small screens)
- **Light / dark / system theme** — via `next-themes`
- **Drag-and-drop tabs** — reorder open files with `@dnd-kit`

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI components | Radix UI + shadcn/ui |
| Drag-and-drop | @dnd-kit |
| URL state | nuqs |
| Themes | next-themes |

## Getting started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000`. The search index is generated automatically before each production build (`npm run build`). For local development it is committed to git, so no extra step is needed.

To regenerate the search index manually after editing page content:

```bash
node scripts/extract-search-content.mjs
```

## Docker

```bash
docker compose up
```

## Adding content

### New project page

1. Create `components/pages/projects/my-project-page.tsx` using `FileContentContainer` as the wrapper.
2. Add an entry to `content/file-system-content.tsx` under the `projects` folder with a unique `FileId`, display name, and optional `keywords`.
3. Add the new `FileId` → source path mapping to the `fileMap` in `scripts/extract-search-content.mjs`.
4. Run `node scripts/extract-search-content.mjs` to index the new page content.

### How search works

At build time (`prebuild`), `scripts/extract-search-content.mjs` reads each page component's TSX source, extracts prose text (JSX text nodes, object string values, JSX string attributes), and writes `content/search-index.json`. The search component matches queries against — in priority order — file name, `keywords[]`, and the extracted text index, then shows a highlighted snippet for content matches.
