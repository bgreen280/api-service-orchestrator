import { $, cd, chalk } from 'zx'; // zx library for simplified scripting

$.verbose = false;

await cd('packages/cli'); // navigate to cli package
const result = await $`yarn start`; // Start the CLI
console.log(chalk.green(result.stdout));
