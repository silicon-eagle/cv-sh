# Terminal Portfolio Website — Design Specification

> **Project Goal:** Build a modern portfolio website that feels like interacting with a premium Linux terminal while remaining intuitive for non-technical visitors.

---

# Vision

The portfolio should immediately communicate:

- Professional software engineer
- Modern engineering mindset
- Attention to detail
- Fun personality
- High technical skill

The experience should feel like opening **Warp**, **Ghostty**, or a beautifully themed terminal—not a Hollywood hacker screen.

The terminal is **the primary interface**, not merely decoration.

---

# Core Principles

## 1. The terminal is the navigation

The visitor should feel like they are connected to a remote machine.

Example:

```text
tim@kelch:~$ help
```

Every navigation begins with a command.

## 2. Never require terminal knowledge

Everything that can be typed can also be clicked.

- Homepage command cards
- Project cards
- Autocomplete suggestions
- Browser Back button
- Deep linking

## 3. Modern over retro

Prefer rounded corners, smooth animations, whitespace, premium typography, and subtle color palettes.

---

# Routing

Use standard Next.js App Router routes:

- /
- /about
- /experience
- /projects
- /projects/[slug]
- /skills
- /contact
- /snake
- /help

---

# Homepage

Display a welcome message, terminal prompt, and clickable command cards. Clicking a card executes the same action as typing the command.

---

# Terminal

Prompt reflects the current page.

```text
tim@kelch:~$
tim@kelch:~/projects$
tim@kelch:~/projects/plan-your-chaos$
```

Features:

- Blinking cursor
- Arrow-key history
- Tab autocomplete
- Ctrl+L
- Enter executes command

---

# Theme System

Commands:

```text
theme
theme catpucchin
theme tokyo-night
theme gruvbox
```

Use CSS variables only.

```css
--background
--panel
--text
--muted
--accent
--border
```
And colors for the specific pages (about, experience, projects, skills, contact) should be defined in CSS variables as well.
These should exist for all themes

Store the selected theme in localStorage.

---

# Easter Eggs
- `fortune`
- `clear`
- to be added.
---

# Tech Stack

- Next.js (App Router)
- React
- TypeScript
- CSS Variables
- Nerd Font
- Framer Motion
- Lucide Icons

---

# Success Criteria

The site should feel like a premium terminal emulator that happens to be a portfolio: memorable, polished, playful, and intuitive.
