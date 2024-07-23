const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const templateDir = path.join(__dirname, 'package-template');
const packagesDir = path.join(__dirname, '..', '..', 'packages');

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function generatePackage() {
  const name = await question('Enter package name: ');
  const description = await question('Enter package description: ');
  const author = await question('Enter package author: ');

  const packageDir = path.join(packagesDir, name);

  // Copy template files
  await fs.copy(templateDir, packageDir);

  // Update package.json
  const packageJsonPath = path.join(packageDir, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  packageJson.name = `@apiso/${name}`;
  packageJson.description = description;
  packageJson.author = author;
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

  // Update README.md
  const readmePath = path.join(packageDir, 'README.md');
  let readmeContent = await fs.readFile(readmePath, 'utf8');
  readmeContent = readmeContent.replace(/\{package-name\}/g, name);
  readmeContent = readmeContent.replace(/\{package-description\}/g, description);
  await fs.writeFile(readmePath, readmeContent);

  // Update index.ts
  const indexPath = path.join(packageDir, 'src', 'index.ts');
  let indexContent = await fs.readFile(indexPath, 'utf8');
  indexContent = indexContent.replace(/\{PackageName\}/g, name.charAt(0).toUpperCase() + name.slice(1));
  await fs.writeFile(indexPath, indexContent);

  console.log(`Package ${name} generated successfully.`);
  rl.close();
}

generatePackage().catch(console.error);