import { Command } from '../interfaces.js';
import {
  Container,
  ConfigurationManager,
  WorkspaceManager,
  ValidationManager,
} from '@awesome-api-skills/core';
import fs from 'fs';
import path from 'path';
import pc from 'picocolors';

function findRepoRoot(): string {
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    if (fs.existsSync(path.join(dir, 'skills'))) return dir;
    dir = path.dirname(dir);
  }
  return process.cwd();
}

const command: Command = {
  name: 'doctor',
  aliases: [],
  description: 'Check workspace health and suggest next steps',
  arguments: '',
  options: {},
  examples: ['awesome-api doctor'],
  async execute() {
    const container = new Container();
    const configManager = new ConfigurationManager();
    container.register('ConfigurationManager', configManager);
    container.register('WorkspaceManager', new WorkspaceManager(configManager));
    container.register('ValidationManager', new ValidationManager());

    const root = findRepoRoot();
    const skillsDir = path.join(root, 'skills');
    const skillCount = fs.existsSync(skillsDir)
      ? fs.readdirSync(skillsDir).filter((f) => fs.statSync(path.join(skillsDir, f)).isDirectory())
          .length
      : 0;

    const issues: string[] = [];
    if (skillCount === 0) issues.push('No skills/ directory found — clone the repo or cd into it');
    if (!fs.existsSync(path.join(root, 'registry/graph.json')))
      issues.push('registry/graph.json missing — run node scripts/dev/build-knowledge-graph.js');

    const healthy = issues.length === 0;

    return {
      status: healthy ? 'healthy' : 'needs-attention',
      nodeVersion: process.version,
      platform: process.platform,
      skillsFound: skillCount,
      registriesConfigured: configManager.get().registryUrls.length,
      issues,
      nextSteps: healthy
        ? [
            'awesome-api search <topic>  — find a skill',
            'npm run dev                    — browse skills in docs',
            'cp -r skills/stripe .skills/stripe — use in your project',
          ]
        : [
            'git clone https://github.com/Ghost7802/awesome-api-skills.git',
            'npm ci && npm run build',
          ],
    };
  },
};

export default command;

export function formatDoctor(data: {
  status: string;
  skillsFound: number;
  issues: string[];
  nextSteps: string[];
}): string {
  const icon = data.status === 'healthy' ? pc.green('✔') : pc.yellow('!');
  const lines = [
    `${icon} ${pc.bold('Workspace')} — ${data.status}`,
    `  ${data.skillsFound} skills available`,
  ];
  if (data.issues.length) {
    lines.push('', pc.bold('Issues:'));
    data.issues.forEach((i) => lines.push(`  ${pc.red('•')} ${i}`));
  }
  lines.push('', pc.bold('Next steps:'));
  data.nextSteps.forEach((s) => lines.push(`  ${pc.dim('→')} ${s}`));
  return lines.join('\n');
}
