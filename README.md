# API Service Orchestrator (apiso)

## overview

features:
- connect and CRUD to multiple services using personal secrets
- data manipulation utility libraries

### setup and config

#### raindrop

- dotenv secrets: api key

#### google

- dotenv secrets: client secret, client key

### services

- [ ] claude
- [ ] clickup - next (supports oauth + api key)
- [ ] google
- [ ] github (starred repos)
- [ ] google
- [ ] google-drive
- [ ] google-fi
- [ ] google-fit
- [ ] instagram (saved bookmarks)
- [ ] linkedin
- [x] raindrop
- [ ] reddit (saved posts)
- [ ] samsung-health
- [x] youtube (saved playlists)

## TODO

- [ ] resolve breaking changes for each module
- [x] typescript
- [ ] dev dependencies: prettier, eslint, ts-node
- [x] re-structure packages
- [x] yarn
- [x] yarn workspaces
- [ ] standardize error handling
- [ ] add clickup support (oauth and api key)
- [ ] add claude support (oauth and api key)
- [ ] jest
- [ ] readme for each service (setup + auth)
- [ ] name
- [ ] generate new package/service script
- [ ] youtube: delete playlist
- [ ] youtube: manage descriptions in bulk
- [x] git init + github
- [x] [BUG] resolve server staying open after getPlaylists has returned result
- [x] get videos for each playlist
- [x] create raindrop for each playlist.item with playlist name and resources as tag
- [x] add raindrop to \_Resources collection
- [x] [BUG][GOOGLE] resolve refresh token
- [x] pagination
- [x] clean repo

---

---
# Prioritized Dev Dependencies and Tools for TypeScript CLI Projects

| Category                 | Tool                | Dev Dependency                                                      | Config File                    | Purpose                                           | Priority |
| ------------------------ | ------------------- | ------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------- | -------- |
| Development Environment  | Node.js             | N/A (system install)                                                | N/A                            | JavaScript runtime for executing the project      | 0        |
| Version Control          | Git                 | N/A (system install)                                                | `.gitignore`                   | Version control system                            | 0        |
| HTTP Client              | Axios               | `axios`                                                             | N/A                            | Promise-based HTTP client for making API requests | 0        |
| Data Processing          | csvtojson           | `csvtojson`                                                         | N/A                            | Converts CSV to JSON                              | 0        |
| Configuration Management | dotenv              | `dotenv`                                                            | `.env`                         | Loads environment variables from a file           | 0        |
| Web Framework            | Express             | `express`                                                           | N/A                            | Web application framework for Node.js             | 0        |
| Session Management       | express-session     | `express-session`                                                   | N/A                            | Session middleware for Express                    | 0        |
| Authentication           | google-auth-library | `google-auth-library`                                               | N/A                            | Google authentication library                     | 0        |
| Google APIs              | googleapis          | `googleapis`                                                        | N/A                            | Google APIs client library                        | 0        |
| Browser Automation       | open                | `open`                                                              | N/A                            | Opens URLs in the user's preferred browser        | 0        |
| Language Enhancement     | TypeScript          | `typescript`                                                        | `tsconfig.json`                | Adds static typing to JavaScript                  | 1        |
| Testing                  | Jest                | `jest @types/jest ts-jest`                                          | `jest.config.js`               | JavaScript testing framework                      | 2        |
| Code Quality             | ESLint              | `eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin` | `.eslintrc.js`                 | Identifies and fixes code problems                | 3        |
| Code Quality             | Prettier            | `prettier`                                                          | `.prettierrc`                  | Ensures consistent code formatting                | 4        |
| Development Workflow     | ts-node             | `ts-node`                                                           | N/A                            | Executes TypeScript files directly                | 5        |
| Code Quality             | Husky               | `husky`                                                             | `.husky/pre-commit`            | Enables Git hooks in your project                 | 6        |
| Code Quality             | lint-staged         | `lint-staged`                                                       | In `package.json`              | Runs linters on staged Git files                  | 7        |
| Project Management       | Lerna               | `lerna`                                                             | `lerna.json`                   | Manages projects with multiple packages           | 8        |
| Development Workflow     | nodemon             | `nodemon`                                                           | `nodemon.json`                 | Auto-restarts application on file changes         | 9        |
| Build Tool               | rimraf              | `rimraf`                                                            | Used in `package.json` scripts | Cross-platform recursive file deletion            | 10       |
| Code Quality             | Commitlint          | `@commitlint/cli @commitlint/config-conventional`                   | `commitlint.config.js`         | Checks commit message format                      | 11       |
| Documentation            | TypeDoc             | `typedoc`                                                           | `typedoc.json`                 | Generates documentation from TypeScript           | 12       |
| Development Workflow     | cross-env           | `cross-env`                                                         | Used in `package.json` scripts | Sets environment variables across platforms       | 13       |
| Publishing               | np                  | `np`                                                                | N/A (CLI tool)                 | Provides a better `npm publish` experience        | 14       |
| Build Tool               | ncc                 | `@vercel/ncc`                                                       | Used in `package.json` scripts | Compiles project into a single file               | 15       |
| Development Workflow     | tsconfig-paths      | `tsconfig-paths`                                                    | In `tsconfig.json`             | Allows use of path aliases                        | 16       |
API service integration and workflow manager/tool

APISIWOM - API Service Integration and Workflow Orchestration Manager
AIWM - API Integration and Workflow Manager
AIWO - API Integration and Workflow Orchestrator
DIWOM - Data Integration and Work



## conventions

- module.exports = { } // export values as object

`dir/index.js` directory index pattern(s):

```js
module.exports = {
  scriptName : require("./scriptName") // Scripts Object has collection of singular scripts (function)
  ServiceName : require("./service-name") // Services Object has collection of singular services (objects) with multiple methods
  UtilityNameA : require("./utilityNameA") // Utilities Object has collection of singular utilities with multiple methods
}
```

`./scripts/script.js` pattern:

```js
module.exports = function scriptName() {
  console.log("script");
};
```

`./services/service.js` pattern:

```js
function doSomething() {}
function doSomethingElse() {}
module.exports = { doSomething, doSomethingElse };
```

---
youtube tools
tubebuddy - A/B test thumbnails, consider doing this for titles

youtube uploads
-- add filename
- description template (provide multiple offerings)
- end screen

title | description | thumbnail | end screen video 1 | end screen video 2 | ...

---
competitors

- [Zapier](https://zapier.com/)
- [MuleSoft](https://www.mulesoft.com/)
- [n8n](https://n8n.io/)


### arch

- `./index.js` // main entry point
  - import `Scripts` and choose desired executable to run
  - import `Services` and `Utilities` for smaller, non-reusable scripts
- `/scripts` // hosts all scripts
  - exports: Scripts.<script-name>
  - import `Services` and `Utilities` for composing cross-service scripts
- `/services` // hosts all service integrations
  - exports: Services.<service-name>.<method>
  - imports `Utilities` and
- `/utils` // hosts utility methods
  - exports: Utilities.<utility-name>.<method>


----
- [ ] statics file
- [ ] express
- [ ] convert 'createServiceClient' to object?
- [ ] implement Claude recommended changes