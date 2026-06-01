import { addTodo, deleteTodo, editTodo, listTodos, markTodoDone } from "./commands";

function printUsage(): void {
  console.log(`Usage:
  node dist/index.js add <title>
  node dist/index.js list
  node dist/index.js list --status open
  node dist/index.js list --status done
  node dist/index.js done <id>
  node dist/index.js delete <id>
  node dist/index.js edit <id> <new title>`);
}

function exitWithError(message: string): never {
  console.error(`Error: ${message}`);
  printUsage();
  process.exit(1);
  throw new Error(message);
}

const [command, ...args] = process.argv.slice(2);

switch (command) {
  case "add":
    addTodo(args);
    break;
  case "list":
    listTodos(args);
    break;
  case "done":
    markTodoDone(args);
    break;
  case "delete":
    deleteTodo(args);
    break;
  case "edit":
    editTodo(args);
    break;
  case "help":
  case undefined:
    printUsage();
    break;
  default:
    exitWithError(`unknown command "${command}".`);
}
