import React, { useState, useEffect } from 'react';
import rawData from './data/skillsData.json';
import { Skill, GraphNode, GraphEdge, RecommendedStack, LearningPath } from './types';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { SkillsCatalog } from './components/SkillsCatalog';
import { PlaygroundView } from './components/PlaygroundView';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { TerminalSimulator } from './components/TerminalSimulator';
import { DocumentationView } from './components/DocumentationView';
import { SkillDetailModal } from './components/SkillDetailModal';
import { SearchModal } from './components/SearchModal';

const skills = (rawData.skills || []) as Skill[];
const graphNodes = (rawData.graph?.nodes || []) as GraphNode[];
const graphEdges = (rawData.graph?.edges || []) as GraphEdge[];
const stacks = (rawData.stacks || []) as RecommendedStack[];
const learningPaths = (rawData.learningPaths || []) as LearningPath[];
const stats = rawData.stats || {};

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleSelectSkillById = (skillId: string) => {
    const found = skills.find(
      (s) => s.id.toLowerCase() === skillId.toLowerCase() || s.name?.toLowerCase() === skillId.toLowerCase()
    );
    if (found) {
      setSelectedSkill(found);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-[#f8fafc]">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setSearchOpen(true)}
        skillCount={skills.length}
      />

      <div className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={setActiveTab}
            skillCount={skills.length}
            edgeCount={graphEdges.length}
          />
        )}

        {activeTab === 'catalog' && (
          <SkillsCatalog
            skills={skills}
            onSelectSkill={(skill) => setSelectedSkill(skill)}
          />
        )}

        {activeTab === 'playground' && <PlaygroundView />}

        {activeTab === 'graph' && (
          <KnowledgeGraphView
            nodes={graphNodes}
            edges={graphEdges}
            stacks={stacks}
            learningPaths={learningPaths}
            stats={stats}
            onSelectSkillById={handleSelectSkillById}
          />
        )}

        {activeTab === 'terminal' && (
          <TerminalSimulator
            skills={skills}
            edgeCount={graphEdges.length}
            onSelectSkill={(skill) => setSelectedSkill(skill)}
          />
        )}

        {activeTab === 'docs' && (
          <DocumentationView
            skillCount={skills.length}
            edgeCount={graphEdges.length}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#1e293b] bg-[#0c121e] py-6 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Awesome API Skills — {skills.length} Verified SKILL.md Specifications</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('catalog')} className="hover:text-sky-400 transition-colors">
              Catalog
            </button>
            <button onClick={() => setActiveTab('playground')} className="hover:text-sky-400 transition-colors">
              Playground
            </button>
            <button onClick={() => setActiveTab('graph')} className="hover:text-sky-400 transition-colors">
              Knowledge Graph
            </button>
            <button onClick={() => setActiveTab('docs')} className="hover:text-sky-400 transition-colors">
              SKILL.md Spec
            </button>
          </div>
        </div>
      </footer>

      {/* Skill Detail Modal */}
      <SkillDetailModal
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
        onSelectSkill={handleSelectSkillById}
      />

      {/* Quick Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        skills={skills}
        onSelectSkill={(skill) => setSelectedSkill(skill)}
      />
    </div>
  );
}

export default App;
