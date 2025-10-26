import React from 'react';
import type { Idea } from '../types';
import IdeaCard from './IdeaCard.tsx';

interface IdeaListProps {
  ideas: Idea[];
  onSelectIdea: (idea: Idea) => void;
}

const IdeaList: React.FC<IdeaListProps> = ({ ideas, onSelectIdea }) => {
  if (ideas.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 mt-4 animate-fade-in">
      {ideas.map((idea, index) => (
        <IdeaCard key={index} idea={idea} onSelectIdea={onSelectIdea} />
      ))}
    </div>
  );
};

export default IdeaList;