import './tsconfig-paths-bootstrap.mjs';
import { ESLint } from 'eslint';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  const eslint = new ESLint({
    errorOnUnmatchedPattern: false,
    useEslintrc: true,
    cwd: __dirname
  });

  const results = await eslint.lintFiles(['**/*.{js,mjs,ts}']);

  const formatter = await eslint.loadFormatter('stylish');
  const resultText = formatter.format(results);
  console.log(resultText);

  const errorCount = results.reduce((count, result) => count + result.errorCount, 0);
  process.exit(errorCount > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error('Error running ESLint', error);
  process.exit(1);
});
