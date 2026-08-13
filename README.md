# cv.sh

A terminal-inspired portfolio built with Next.js.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Code structure

```text
app/
├── layout.tsx             # Root providers and terminal shell
├── page.tsx               # Home page
├── about/                 # About route and route-specific styles
├── education/             # Education timeline route
├── experience/            # Work experience timeline route
├── help/                  # Help route generated from the command registry
└── routes.test.tsx        # Route-level tests

components/
├── command-button.*       # Reusable terminal command button
├── page-command-buttons.* # Navigation buttons generated from page commands
├── terminal-line.*        # Prompt, input, autocomplete, and history controls
├── terminal-provider.tsx  # Command execution and terminal output state
├── terminal-shell.*       # Shared terminal frame
├── theme-picker.*         # Available theme controls
├── theme-provider.*       # Theme state and persistence
└── *.test.ts(x)           # Colocated component tests

lib/
├── commands.ts            # Central command registry and theme names
├── commands.test.ts       # Command registry tests
├── terminal.ts            # Parsing, autocomplete, and prompt utilities
└── terminal.test.ts       # Terminal utility tests
```

`lib/commands.ts` is the single source of truth for supported commands. Navigation
commands include their route and button metadata, so the help page, autocomplete,
execution, and page-navigation buttons update from the same entry.

Tests are colocated with the code they cover. Vitest uses `vitest.setup.ts` for
shared test setup.

## Adding a page

1. Create the route at `app/<page>/page.tsx` and add route-specific styles beside
   it when needed.
2. Import a relevant Lucide icon in `lib/commands.ts`, then add one `navigate`
   entry to `terminalCommands`. The
   entry is type-checked against `NavigationCommand`, which requires the route
   path, color, and icon. Add optional `button` metadata when the command should
   appear in the `nav` menu:

   ```ts
   import { FolderCode } from "lucide-react";

   {
     name: "projects",
     autocomplete: ["projects"],
     help: [{ usage: "projects", description: "View selected projects" }],
     action: "navigate",
     path: "/projects",
     icon: FolderCode,
     color: "var(--projects-accent)",
     button: {
       label: "Projects",
       description: "Selected work",
     },
   }
   ```

3. Define the referenced accent variable for every theme in `app/globals.css` if
   it does not already exist. Omit `button` for routes that should remain
   terminal commands without appearing in page navigation.
4. Wrap the route content in `<PageLayout>`. It provides the shared heading,
   `nav`-controlled page buttons, terminal panel, and content spacing.
5. Add the page behavior to `app/routes.test.tsx` and update the expected command
   list in `lib/commands.test.ts`.

No separate changes are required for command execution, autocomplete, or the help
page; they are generated from the command registry. Do not modify
`NavigationCommand` when adding a page unless the metadata required for every
navigation command is changing.

Page navigation is hidden by default. Run `nav` in the terminal to show or hide
the generated page buttons.

## Commands

```bash
pnpm dev       # Start the development server
pnpm build     # Create a production build
pnpm lint      # Run ESLint
pnpm test      # Run Vitest in watch mode
pnpm test:run  # Run the test suite once
```
