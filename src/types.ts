export interface SkillRelationship {
  target: string;
  type: string;
}

export interface SkillExample {
  filename: string;
  content: string;
}

export interface SkillPrompt {
  filename: string;
  content: string;
}

export interface Skill {
  id: string;
  name: string;
  version?: string;
  description?: string;
  categories: string[];
  languages?: string[];
  author?: string;
  license?: string;
  links?: Record<string, string | undefined>;
  schemaVersion?: string;
  validationStatus?: string;
  maintainer?: string;
  lastUpdated?: string;
  documentationSource?: string;
  supportedAgents?: string[];
  compatibility?: string;
  lastVerified?: string;
  pitfalls?: string[];
  checklist?: string[];
  relationships?: SkillRelationship[];
  relatedSkills?: string[];
  learningLevel?: string;
  useCases?: string[];
  deploymentTargets?: string[];
  ecosystem?: string;
  skillMd?: string;
  examples?: SkillExample[];
  prompts?: SkillPrompt[];
}

export interface GraphNode {
  id: string;
  label?: string;
  categories?: string[];
  ecosystem?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  type: string;
}

export interface RecommendedStack {
  name: string;
  stack: string[];
}

export interface LearningPath {
  name: string;
  path: string[];
}

export interface Diagnostic {
  rule: string;
  category: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  suggestion: string;
}
