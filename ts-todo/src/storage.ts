import fs from "node:fs";
import path from "node:path";
import type { Todo } from "./types";

const dataFilePath = path.resolve(process.cwd(), "todos.json");

export function readJson<T>(filePath: string): T {
  const contents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(contents) as T;
}

export function writeJson<T>(filePath: string, data: T): void {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function loadTodos(): Todo[] {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }

  try {
    return readJson<Todo[]>(dataFilePath);
  } catch {
    console.error("Error: todos.json could not be read. Check that it contains valid JSON.");
    process.exit(1);
    throw new Error("Invalid todos.json");
  }
}

export function saveTodos(todos: Todo[]): void {
  writeJson(dataFilePath, todos);
}
