norms

- module.exports = { } // export values as object

supported services

- [ ] clickup
- [ ] google
- [ ] google-drive
- [ ] google-fi
- [ ] google-fit
- [x] raindrop
- [ ] reddit
- [ ] samsung-health
- [x] youtube

arch

/index.js // main entry point

- import `Scripts` and choose desired executable to run
- import `Services` and `Utilities` for smaller, non-reusable scripts
  /scripts //
- hosts all scripts
- exports: Scripts.<script-name>
- import `Services` and `Utilities` for composing cross-service scripts
  /services //
- hosts all service integrations
- exports: Services.<service-name>.<method>
- imports `Utilities` and
  /utils //
- hosts utility methods
- exports: Utilities.<utility-name>.<method>

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
