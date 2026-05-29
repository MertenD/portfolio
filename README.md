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

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `OPENROUTER_API_KEY` | Yes | API key for the AI chat ([openrouter.ai](https://openrouter.ai)) |
| `AI_MODEL` | No | OpenRouter model ID (default: `google/gemini-3.1-flash-lite`) |
| `DATABASE_URL` | Yes | SQLite connection string — `file:./dev.db` for local dev |

Copy `.env.example` to `.env` and fill in the values before running the app.

## Analytics

Visitor events (file opens, link clicks, sidebar navigation) and chat conversations are stored in a local SQLite database via Prisma.

Run the migration once before the first start:

```bash
npx prisma migrate dev
```

The admin dashboard is available at `/admin`. In development it is accessible without authentication. In production it is protected by Traefik BasicAuth (see below).

## Docker & Traefik deployment

The `docker-compose.yml` is designed for a server running Traefik as a reverse proxy.

### 1. Create `.env` on the server

```bash
cp .env.example .env
```

Set at minimum:

```env
OPENROUTER_API_KEY=sk-or-v1-...

# Generate with: htpasswd -nB admin | sed 's/\$/\$\$/g'
# Every $ in the bcrypt hash must be written as $$ for docker-compose interpolation
ADMIN_BASIC_AUTH=admin:$$2y$$05$$...
```

`DATABASE_URL` is set inside `docker-compose.yml` to `file:/data/portfolio.db` and does **not** need to be in `.env`.

### 2. Generate the admin password hash

```bash
# Requires apache2-utils / httpd-tools — or use Docker:
docker run --rm httpd htpasswd -nB admin

# Escape $ signs for docker-compose (run in bash):
htpasswd -nB admin | sed 's/\$/\$\$/g'
```

Paste the result as `ADMIN_BASIC_AUTH` in `.env`.

### 3. Start the container

```bash
docker compose pull && docker compose up -d
```

The portfolio is then live at `https://merten.tech`. The admin dashboard at `https://merten.tech/admin` is protected by a browser login prompt — Traefik intercepts the request before it reaches the app.

### How the auth routing works

Two Traefik routers are configured for the same container:

| Router | Rule | Middleware |
|---|---|---|
| `merten-portfolio` | `Host(...)` | redirect `mertendieckmann.de → merten.tech` |
| `merten-portfolio-admin` | `Host(...) && PathPrefix(/admin)` | redirect + BasicAuth |

Traefik automatically assigns higher priority to the more specific `/admin` router (longer rule), so every request to `/admin` is challenged for credentials first.

### Database persistence

Analytics data lives in a Docker named volume (`portfolio-data`) mounted at `/data` inside the container. It survives container restarts and image updates.

```bash
# Backup
docker exec merten-portfolio cp /data/portfolio.db /tmp/backup.db
docker cp merten-portfolio:/tmp/backup.db ./portfolio-backup.db
```

## Adding content

### New project page

1. Create `components/pages/projects/my-project-page.tsx` using `FileContentContainer` as the wrapper.
2. Add an entry to `content/file-system-content.tsx` under the `projects` folder with a unique `FileId`, display name, and optional `keywords`.
3. Add the new `FileId` → source path mapping to the `fileMap` in `scripts/extract-search-content.mjs`.
4. Run `node scripts/extract-search-content.mjs` to index the new page content.

### How search works

At build time (`prebuild`), `scripts/extract-search-content.mjs` reads each page component's TSX source, extracts prose text (JSX text nodes, object string values, JSX string attributes), and writes `content/search-index.json`. The search component matches queries against — in priority order — file name, `keywords[]`, and the extracted text index, then shows a highlighted snippet for content matches.
