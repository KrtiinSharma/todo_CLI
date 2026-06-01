import { loadTodos, saveTodos } from "./storage";
import type { Todo, TodoStatus } from "./types";

function exitWithError(message: string): never {
  console.error(`Error: ${message}`);
  process.exit(1);
  throw new Error(message);
}

function isTodoStatus(value: string): value is TodoStatus {
  return value === "open" || value === "done";
}

function parseId(value: string | undefined): number {
  if (value === undefined) {
    exitWithError("missing todo ID.");
  }

  const id = Number(value);

  if (!Number.isInteger(id) || id < 1) {
    exitWithError(`"${value}" is not a valid todo ID.`);
  }

  return id;
}

function requireTitle(parts: string[], commandName: string): string {
  const title = parts.join(" ").trim();

  if (title.length === 0) {
    exitWithError(`missing title for "${commandName}".`);
  }

  return title;
}

function getNextId(todos: Todo[]): number {
  const highestId = todos.reduce((highest, todo) => Math.max(highest, todo.id), 0);
  return highestId + 1;
}

function findTodoById(todos: Todo[], id: number): Todo | undefined {
  return todos.find((todo) => todo.id === id);
}

function formatDate(isoDate: string): string {
  return isoDate.slice(0, 10);
}

function printTodos(todos: Todo[]): void {
  if (todos.length === 0) {
    console.log("No todos found.");
    return;
  }

  for (const todo of todos) {
    const id = `[${todo.id}]`.padEnd(5);
    const title = todo.title.padEnd(24);
    const status = `[${todo.status}]`.padEnd(9);
    console.log(`${id} ${title} ${status} ${formatDate(todo.createdAt)}`);
  }
}

function parseStatusFilter(args: string[]): TodoStatus | undefined {
  const statusFlagIndex = args.indexOf("--status");

  if (statusFlagIndex === -1) {
    return undefined;
  }

  const statusValue = args[statusFlagIndex + 1];

  if (statusValue === undefined) {
    exitWithError('missing value for "--status". Use "open" or "done".');
  }

  if (!isTodoStatus(statusValue)) {
    exitWithError(`invalid status "${statusValue}". Use "open" or "done".`);
  }

  return statusValue;
}

export function addTodo(args: string[]): void {
  const title = requireTitle(args, "add");
  const todos = loadTodos();
  const now = new Date().toISOString();

  const todo: Todo = {
    id: getNextId(todos),
    title,
    status: "open",
    createdAt: now,
    updatedAt: now,
  };

  todos.push(todo);
  saveTodos(todos);
  console.log(`Added todo ${todo.id}: ${todo.title}`);
}

export function listTodos(args: string[]): void {
  const status = parseStatusFilter(args);
  const todos = loadTodos();
  const visibleTodos = status === undefined ? todos : todos.filter((todo) => todo.status === status);
  printTodos(visibleTodos);
}

export function markTodoDone(args: string[]): void {
  const id = parseId(args[0]);
  const todos = loadTodos();
  const todo = findTodoById(todos, id);

  if (todo === undefined) {
    exitWithError(`todo with ID ${id} does not exist.`);
  }

  todo.status = "done";
  todo.updatedAt = new Date().toISOString();
  saveTodos(todos);
  console.log(`Marked todo ${id} as done.`);
}

export function deleteTodo(args: string[]): void {
  const id = parseId(args[0]);
  const todos = loadTodos();
  const todoExists = todos.some((todo) => todo.id === id);

  if (!todoExists) {
    exitWithError(`todo with ID ${id} does not exist.`);
  }

  saveTodos(todos.filter((todo) => todo.id !== id));
  console.log(`Deleted todo ${id}.`);
}

export function editTodo(args: string[]): void {
  const id = parseId(args[0]);
  const title = requireTitle(args.slice(1), "edit");
  const todos = loadTodos();
  const todo = findTodoById(todos, id);

  if (todo === undefined) {
    exitWithError(`todo with ID ${id} does not exist.`);
  }

  todo.title = title;
  todo.updatedAt = new Date().toISOString();
  saveTodos(todos);
  console.log(`Updated todo ${id}: ${title}`);
}
