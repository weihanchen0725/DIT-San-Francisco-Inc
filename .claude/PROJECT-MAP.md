---
name: project-map
description: >
  Use at the START of any task that needs to know where things live in the
  codebase, and AFTER any change that alters structure (adding/moving/deleting
  files, functions, components, routes, or data flow). Maintains a lean
  navigational index at .claude/PROJECT_MAP.md so future sessions orient quickly
  without re-scanning the whole repo.
---

# Project map

A persistent index of the project's folders, files, key components/functions, routes, and where important logic lives. Reading it first is cheaper than exploring the tree every session — but only while it stays accurate.

## Read first
- At the start of a task that needs codebase context, **read `.claude/PROJECT_MAP.md` before grepping or listing the tree.** Use it to jump straight to the relevant files.
- It's a fast index, **not ground truth.** Before editing a file it points to, open that file to confirm — the map can lag the code.
- **Reality wins.** If the map disagrees with the code, trust the code and fix the map.

## Keep it current (part of "done")
Update the relevant entry **in the same change** whenever you:
- add, rename, move, or delete a file or folder;
- add/remove an exported function, component, hook, route, or API handler;
- change how data flows (new provider, new data source, changed state/fetching).

A stale map causes wrong edits, so updating it isn't optional — it's part of finishing the task.

## Keep it lean
- It's a navigational index, **not a copy of the code.** One line per file/area: its role + key exports. Never paste code bodies.
- Group by area (routes, components, lib, i18n, styles, config). If a section gets large, link out to an area-specific note rather than bloating one file.
- Don't duplicate CLAUDE.md — that holds always-true facts (stack, commands, conventions); the map holds the file/function index.

## Bootstrap (if the map is missing or thin)
Generate it once by scanning the repo: top-level dirs, the route tree, components with their key exports/props, lib/utilities, i18n setup and message location, and where domain logic lives (e.g. the calculator / Incoterms advisor / dictionary). Then maintain it incrementally. Mark anything uncertain as "to verify" instead of guessing.

## Verify
- After editing, the map matches reality for every file you touched, and any entry you relied on was confirmed against the actual code.