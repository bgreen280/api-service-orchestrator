import { register } from 'tsconfig-paths';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const tsConfig = JSON.parse(readFileSync(resolve(__dirname, './tsconfig.base.json'), 'utf-8'));

register({
  baseUrl: resolve(__dirname, tsConfig.compilerOptions.baseUrl),
  paths: tsConfig.compilerOptions.paths,
});
