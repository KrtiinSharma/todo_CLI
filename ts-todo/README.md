# Setup
npm install
## Build
npm run build
## Type Check
npm run check


## Commands
node dist/index.js add "Buy groceries"
##
node dist/index.js list
##
node dist/index.js list --status open
##
node dist/index.js list --status done
##
node dist/index.js done 1
##
node dist/index.js delete 1
##
node dist/index.js edit 1 "Buy vegetables"


## Data

Todos are stored in `todos.json` in the project root. The file is created automatically the first time a todo is saved.
