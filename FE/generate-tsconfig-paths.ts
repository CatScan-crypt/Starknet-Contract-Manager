import { aliases } from './alias.config';
import fs from 'fs';
import path from 'path';

const tsconfigPaths = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [
    `${key}/*`,
    [path.relative('.', value) + '/*'],
  ])
);

const tsconfig = {
  compilerOptions: {
    baseUrl: '.',
    paths: tsconfigPaths,
  },
};

fs.writeFileSync('tsconfig.paths.json', JSON.stringify(tsconfig, null, 2));
console.log('✅ Generated tsconfig.paths.json');
