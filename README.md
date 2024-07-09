# middle-man api wrangler

## overview

### setup and config

#### raindrop

- dotenv secrets: api key

#### google

- dotenv secrets: client secret, client key

### services

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

## TODO

- [ ] add clickup support (oauth and api key)
- [ ] migrate to monorepo arch (see: `git-branch:seperate-services`)
- [ ] typescript
- [ ] dev dependencies: prettier, eslint
- [ ] standardize error handling
- [ ] describe setup
- [ ] update docs in readme
- [ ] delete playlist
- [ ] readme for each service (setup + auth)
- [x] git init + github
- [x] [BUG] resolve server staying open after getPlaylists has returned result
- [x] get videos for each playlist
- [x] create raindrop for each playlist.item with playlist name and resources as tag
- [x] add raindrop to \_Resources collection
- [x] [BUG][GOOGLE] resolve refresh token
- [x] pagination
- [x] clean repo

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
