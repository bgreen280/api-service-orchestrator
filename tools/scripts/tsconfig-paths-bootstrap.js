// tools/scripts/tsconfig-paths-bootstrap.mjs
import { register } from 'tsconfig-paths';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsConfigPath = path.resolve(__dirname, '../../tsconfig.base.json');

if (fs.existsSync(tsConfigPath)) {
  const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));

  register({
    baseUrl: tsConfig.compilerOptions.baseUrl,
    paths: tsConfig.compilerOptions.paths,
  });
} else {
  console.error("Couldn't find tsconfig.json. tsconfig-paths will be skipped");
}
