import React from 'react';
import type { Idea } from '../types';
import { CodeIcon } from './icons/CodeIcon.tsx';

interface IdeaCardProps {
  idea: Idea;
  onSelectIdea: (idea: Idea) => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onSelectIdea }) => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 p-3 rounded-md border border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md hover:border-purple-400">
      <h4 className="font-semibold text-gray-800">{idea.title}</h4>
      <p className="text-xs text-gray-600 mt-1 mb-3">{idea.description}</p>
      <button
        onClick={() => onSelectIdea(idea)}
        className="flex items-center justify-center gap-2 w-full text-xs text-center px-3 py-1 font-bold text-purple-800 bg-purple-200 border border-purple-400 rounded-md hover:bg-purple-300 focus:outline-none transition-colors duration-200"
      >
        <CodeIcon className="w-4 h-4" />
        Use this code
      </button>
    </div>
  );
};

export default IdeaCard;