const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../../apps', 'docs');
fs.mkdirSync(docsDir, { recursive: true });

const packageJson = {
  name: '@awesome-api-skills/docs',
  version: '1.0.0',
  private: true,
  scripts: {
    dev: 'vitepress dev src',
    build: 'vitepress build src --outDir ../dist',
    serve: 'vitepress serve src',
    analyze: 'vite-bundle-visualizer',
  },
  dependencies: {
    vue: '^3.5.0',
    vitepress: '1.5.0',
    '@awesome-api-skills/core': 'workspace:*',
    '@awesome-api-skills/shared-types': 'workspace:*',
    '@awesome-api-skills/validator': 'workspace:*',
    '@awesome-api-skills/generator': 'workspace:*',
  },
  devDependencies: {
    lighthouse: '^12.2.0',
    'vite-bundle-visualizer': '^1.2.1',
  },
};

fs.writeFileSync(path.join(docsDir, 'package.json'), JSON.stringify(packageJson, null, 2));

// Create initial source directory structure
fs.mkdirSync(path.join(docsDir, 'src'), { recursive: true });
fs.mkdirSync(path.join(docsDir, 'src', '.vitepress'), { recursive: true });
fs.mkdirSync(path.join(docsDir, 'src', '.vitepress', 'theme'), { recursive: true });

fs.writeFileSync(
  path.join(docsDir, 'src', 'index.md'),
  '# Awesome API Skills\n\nDocumentation goes here.',
);

console.log('Created apps/docs scaffold');
