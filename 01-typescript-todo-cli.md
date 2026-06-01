# Project 1: TypeScript Todo CLI

## Goal

Build a command-line todo list manager that runs in the terminal. This project has no framework - the only goal is to get comfortable writing TypeScript before introducing Next.js.

---

## Learning Objectives

By the end of this project you should be able to:

- Set up a TypeScript project from scratch (`tsconfig.json`, `tsc`)
- Declare types, interfaces, and enums
- Use union types and type guards
- Work with generics (at least one instance)
- Understand `strict` mode and why it matters

---

## Functional Requirements

The program accepts commands as CLI arguments. All state is persisted to a local `todos.json` file.

### Commands

| Command | Description |
|---|---|
| `add <title>` | Creates a new todo |
| `list` | Prints all todos |
| `list --status open` | Filters by status |
| `list --status done` | Filters by status |
| `done <id>` | Marks a todo as done |
| `delete <id>` | Deletes a todo |
| `edit <id> <new title>` | Updates the title of a todo |

### Sample output for `list`

```text
[1] Buy groceries          [open]    2026-05-30
[2] Call the plumber       [done]    2026-05-29
[3] Renew vehicle tax      [open]    2026-05-28
```

---

## Data Model

Define this as a TypeScript interface in a separate `types.ts` file:

```text
Todo
  id        number       auto-incrementing, assigned on creation
  title     string       required, non-empty
  status    "open"       | "done"
  createdAt string       ISO date string
  updatedAt string       ISO date string
```

`status` must be a **union type**, not a plain string.

---

## Technical Requirements

1. **TypeScript strict mode** - `"strict": true` in `tsconfig.json`. The project must compile with zero errors.
2. **No `any`** - if you feel you need `any`, figure out the correct type instead.
3. **Separate files** - at minimum: `types.ts`, `storage.ts` (read/write JSON), `commands.ts` (command logic), `index.ts` (entry point).
4. **One generic function** - `storage.ts` should export a generic `readJson<T>(path: string): T` function. This is the one place to practice generics.
5. **Error handling** - if the user runs `done 99` and ID 99 does not exist, print a clear error message and exit with code 1. Do not crash with an unhandled exception.
6. **No external libraries** - only Node.js built-ins (`fs`, `path`, `process`). The point is to write TypeScript, not wire up a framework.

---

## Project Setup

```bash
mkdir ts-todo && cd ts-todo
npm init -y
npm install --save-dev typescript @types/node
npx tsc --init
```

Set `"outDir": "dist"` and `"rootDir": "src"` in `tsconfig.json`. Run the program with:

```bash
npx tsc && node dist/index.js add "Buy groceries"
```

---

## Deliverables

- Source compiles cleanly with `tsc --noEmit`
- All 7 commands work as described
- `todos.json` persists across runs
- A short `README.md` with setup steps and one example of each command

---

## Stretch Goals (if finished early)

1. Add a `priority` field - `"low" | "medium" | "high"` - and a `list --priority high` filter
2. Add a `due` field (date string) and show overdue todos in a different colour using ANSI codes
3. Write a `validateTodo()` function that takes `unknown` input from the JSON file and returns a typed `Todo` - this simulates validating external data, which comes up constantly in real apps

---

## What to Ask Yourself

These questions are worth thinking through before writing code:

- What happens if `todos.json` does not exist yet - how does your code handle first run?
- How do you ensure `id` is always unique, even if todos are deleted in between?
- What does TypeScript's `strict` mode actually enable that plain `tsc` does not?

---

Estimated time: **1 full day**. If the stretch goals are included, allow a second day.
