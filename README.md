# cv.sh

A responsive, terminal-inspired portfolio built with Next.js, React, and
TypeScript.

The site supports command-driven navigation, autocomplete, command history,
multiple themes, project detail pages, a random cat overlay, and a playable
Snake game. The package version is displayed in the terminal status bar.

## Getting started

This project uses pnpm through Corepack:

```bash
corepack enable
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
pnpm dev       # Start the development server
pnpm build     # Create a production build
pnpm start     # Start the production server after building
pnpm lint      # Run ESLint
pnpm test      # Run Vitest in watch mode
pnpm test:run  # Run the test suite once
pnpm exec tsc --noEmit  # Type-check without building
```

The commands available inside the portfolio are defined in
`lib/commands.ts`. Run `help` or `ls` in the site terminal to see them. Page
navigation is hidden by default and can be toggled with `nav`. On mobile, the
navigation buttons are grouped behind a hamburger button.

## Code structure

```text
app/
├── layout.tsx              # Fonts, providers, cat discovery, and terminal shell
├── page.tsx                # Home page
├── about/                  # About route
├── education/              # Education route
├── experience/             # Work experience route
├── help/                   # Generated command and shortcut reference
├── projects/               # Project overview and generated detail routes
├── skills/                 # Skills route
├── snake/                  # Snake game
└── routes.test.tsx         # Route-level tests

components/
├── cat-overlay.*           # Temporary floating cat image
├── page-command-buttons.*  # Desktop and mobile page navigation
├── project-details.*       # Project detail presentation
├── project-list.*          # Project overview cards
├── status-bar.*            # Route, profile, status, and package version
├── terminal-provider.tsx   # Command execution and shared terminal state
├── terminal-shell.*        # Shared terminal frame
├── theme-provider.*        # Theme state and persistence
└── *.test.ts(x)            # Colocated component tests

lib/
├── cats.ts                 # Server-side cat image discovery
├── commands.ts             # Command registry and theme names
├── project.ts              # Project model
├── projects.ts             # Project content
├── terminal.ts             # Parsing, autocomplete, and prompt utilities
└── *.test.ts               # Colocated library tests

public/
├── cats/compressed/        # Images discovered for the `cat` command
└── projects/               # Project screenshots and artwork
```

`lib/commands.ts` is the source of truth for terminal commands. Navigation
commands include their route, Pixelarticons icon, accent color, and optional
button metadata. The help page, autocomplete, command execution, and page
navigation are generated from this registry.

## Adding a page

1. Create `app/<page>/page.tsx` and any route-specific CSS Module.
2. Add a `navigate` entry to `terminalCommands` in `lib/commands.ts`.
3. Define the entry's route, Pixelarticons icon, accent color, help text, and
   optional `button` metadata.
4. Define the referenced accent variable for every theme in `app/globals.css`.
5. Wrap the page content in `<PageLayout>`.
6. Update `app/routes.test.tsx` and `lib/commands.test.ts`.

Navigation entries without `button` metadata remain terminal-only routes.

## Adding a project

Add a `Project` instance to `lib/projects.ts` and place its images under
`public/projects/<slug>/`. Each project defines:

- `slug`, `title`, `subtitle`, `description`, and `date`
- `mainImage` and optional `subImages` and `icon`
- `type`, `role`, `stack`, `status`, and optional links

The project is then automatically included on `/projects`, generated at
`/projects/<slug>`, and made available as a command while the user is on the
projects page.

## Cat images

The `cat` command selects a random image and displays it as a floating,
pointer-transparent overlay for four seconds.

Cat images are discovered server-side from `public/cats/compressed`. To update
the collection, add, replace, or remove an `avif`, `gif`, `jpg`, `jpeg`, `png`,
or `webp` file in that directory. No filename list or dimensions need to be
updated: the files are imported automatically and Next.js supplies their
intrinsic dimensions.

## Docker

The multi-stage `Dockerfile` builds the Next.js standalone server and runs it
as a non-root user on port 3000:

```bash
docker build --target runner -t cv-sh .
docker run --rm -p 3000:3000 cv-sh
```

The image includes an HTTP health check for `/`. The standalone deployment
copies `public`, `.next/standalone`, and `.next/static` into the runtime image.

`pnpm-workspace.yaml` contains the pnpm 11 dependency build policy required by
the container install.

## Forgejo CI/CD

`.forgejo/workflows/ci-cd.yml` runs on pull requests and pushes to `main`.
Validation installs frozen dependencies, runs ESLint, type-checks, runs the
test suite, and creates a production build.

On a push to `main`, the workflow publishes
`forgejo.arda:3000/tkelch/cv:<commit-sha>` and `:latest`, then deploys the
Compose service named `cv` from `${DEPLOY_PATH}/compose.yml`. Deployment
verification uses `docker compose up --wait --wait-timeout 90`.

The Forgejo repository must provide these secrets:

| Secret | Purpose |
| --- | --- |
| `REGISTRY_USERNAME` | Forgejo container registry username |
| `REGISTRY_TOKEN` | Forgejo container registry token |
| `DEPLOY_SSH_KEY` | Private key used to connect to the deployment host |
| `DEPLOY_HOST` | Deployment host name or address |
| `DEPLOY_USER` | SSH user on the deployment host |
| `DEPLOY_PATH` | Directory containing `compose.yml` |
