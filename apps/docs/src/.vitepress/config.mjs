import fs from 'node:fs';
import path from 'node:path';

export default {
  title: 'Awesome API Skills',
  description: 'A collection of structured API skills for AI coding agents.',
  outDir: '../dist',
  vite: {
    build: {
      chunkSizeWarningLimit: 2000,
    },
  },
  buildEnd() {
    const docsRoot = path.resolve(process.cwd());
    const outDir = path.join(docsRoot, 'dist');
    const vitepressDist = path.join(docsRoot, 'src', '.vitepress', 'dist');
    const repoRootDist = path.resolve(docsRoot, '..', '..', 'dist');
    if (fs.existsSync(outDir)) {
      fs.cpSync(outDir, vitepressDist, { recursive: true });
      fs.cpSync(outDir, repoRootDist, { recursive: true });
    }
  },
};
