# Student Research Assistant

An MCP (Model Context Protocol) server built on the [NitroStack](https://docs.nitrostack.ai) SDK that helps students plan and research a project from start to finish: find academic papers, organize them into collections, discover datasets and GitHub repositories, get hardware suggestions, build a learning roadmap, and generate a project blueprint. Results render as interactive widgets in clients that support them.

## Features

| Module | Tool | What it does |
| --- | --- | --- |
| Research | `search-papers` | Search papers by topic, with optional year and minimum-citation filters |
| Research | `get-paper-details` | Full metadata for one paper, including related papers |
| Organize | `save-to-collection` | Add a paper to a named collection (created if missing) |
| Organize | `list-collections` | List collections, optionally filtered by name or tag |
| GitHub | `search-github-repos` | Live search of the GitHub API (stars, language, license, topics, rate-limit info) |
| GitHub | `search-github-projects` | Quick project suggestions for a topic and language |
| Dataset | `search-datasets` | Dataset suggestions for a topic, optionally by source (e.g. Kaggle, UCI) |
| Learning | `get-learning-roadmap` | Step-by-step roadmap for a topic and experience level |
| Hardware | `get-hardware-recommendations` | Component suggestions (e.g. ESP32, Raspberry Pi) for a project type and budget |
| Architect | `create-project-blueprint` | Combined plan covering research, datasets, GitHub, hardware, and learning |
| Calculator | `calculate` | add / subtract / multiply / divide |
| Calculator | `convert_temperature` | Celsius to Fahrenheit and back; an uploaded file is optional |

**Data sources.** Paper and collection data come from the local files in `fixtures/` (`papers.json`, `collections.json`). `search-github-repos` calls the real GitHub API. `search-github-projects`, `search-datasets`, `get-learning-roadmap`, `get-hardware-recommendations`, and `create-project-blueprint` currently return built-in sample/template data, so they work offline but are not live searches.

Each module also exposes MCP resources and prompts (for example `research-help`, `organize-help`, `calculator_help`).

### Widgets

Tool results are rendered by Next.js widgets in `src/widgets/app/`: `research-hub`, `calculator-result`, `github-hub`, `github-repos-search`, `dataset-hub`, `learning-hub`, `architect-hub`, and `hardware-hub`. Each is registered in `src/widgets/widget-manifest.json`.

## Requirements

- Node.js 18+ (developed on Node 22)
- npm

## Setup

```bash
# 1. Install server dependencies
npm install

# 2. Install widget dependencies
npm --prefix src/widgets install     # or: npm run install:all

# 3. Create your env file
cp .env.example .env
```

### Environment variables (`.env`)

| Variable | Default | Purpose |
| --- | --- | --- |
| `NITRO_LOG_LEVEL` | `info` | Log verbosity |
| `NITROSTACK_APP_MODE` | `universal` | Target client mode |
| `GITHUB_TOKEN` | empty | Optional GitHub token; raises the API limit from 60 to 5000 requests/hour. Needs only the `public_repo` scope |
| `MCP_TRANSPORT_TYPE` | `stdio` (dev), `dual` (production) | `stdio`, `http`, or `dual` |
| `PORT` / `HOST` / `ENABLE_CORS` | `3000` / `localhost` / `true` | HTTP transport settings |

## Running

```bash
npm run dev         # TypeScript watch + widget dev server (use with NitroStudio)
npm run build       # Bundle widgets and compile TypeScript to dist/
npm start           # Build, then start the production server
npm run start:prod  # Start without rebuilding
```

Run `npm run build` after changing anything in `src/`: the server runs the compiled output in `dist/`, and widgets are served from `src/widgets/out/`.

### Connecting a client

- **NitroStudio** (recommended for testing): open the project folder in <https://nitrostack.ai/studio>.
- **stdio clients** (e.g. Claude Desktop): point the client at `node /absolute/path/to/dist/index.js`.
- **HTTP clients**: set `MCP_TRANSPORT_TYPE=http` (or `dual`) and connect to the server on `PORT`.

## Project structure

```
fixtures/                  Sample papers and collections (JSON)
src/
  index.ts                 Entry point
  app.module.ts            Root module; registers all feature modules
  health/system.health.ts  Health check
  modules/
    research/              search-papers, get-paper-details
    organize/              save-to-collection, list-collections
    github/                search-github-repos, search-github-projects (+ GitHub API service)
    dataset/               search-datasets
    learning/              get-learning-roadmap
    hardware/              get-hardware-recommendations
    architect/             create-project-blueprint
    calculator/            calculate, convert_temperature
    discover/              Earlier draft of research; not registered in AppModule
  widgets/                 Next.js widget app (app/, widget-manifest.json, out/)
dist/                      Compiled server output (generated)
```

Each module follows the same pattern: `*.module.ts` declares the module, `*.tools.ts` holds the tools, and optional `*.resources.ts` / `*.prompts.ts` add MCP resources and prompts.

## Adding a feature

1. Create `src/modules/<name>/` with a module and a tools class (`@Module`, `@Tool`, Zod input schema).
2. Import the module in `src/app.module.ts`.
3. (Optional) Add a widget page at `src/widgets/app/<widget-id>/page.tsx`, reference it with `@Widget('<widget-id>')`, and add an entry to `widget-manifest.json`.
4. Run `npm run build`.

## Troubleshooting

- **GitHub "rate limit exceeded"**: set `GITHUB_TOKEN` in `.env`.
- **Tool or widget changes not showing up**: rebuild with `npm run build` and restart the client connection.
- **A widget shows blank**: confirm `src/widgets/out/<widget-id>.html` exists (created by the build).
- **`OAUTH_CONFIG` message at startup**: the logged `Cannot resolve token "OAUTH_CONFIG"` error comes from the framework's optional OAuth module, which this project does not configure. It is not fatal.
- **PostHog / telemetry errors during build**: these appear only when the network blocks analytics and don't affect the build.

## Links

- Docs: <https://docs.nitrostack.ai>
- NitroStack repository: <https://github.com/nitrocloudofficial/nitrostack>
- NitroStudio: <https://nitrostack.ai/studio>
