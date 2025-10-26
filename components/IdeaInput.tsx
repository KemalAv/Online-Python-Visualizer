import React, { useState } from 'react';
import { WandIcon } from './icons/WandIcon.tsx';

interface IdeaInputProps {
  onGenerateIdeas: (prompt: string) => void;
  isLoading: boolean;
}

const IdeaInput: React.FC<IdeaInputProps> = ({ onGenerateIdeas, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateIdeas(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., a pie chart for a monthly budget"
        className="w-full p-2 border border-gray-300 rounded-md shadow-inner text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
        rows={3}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="flex items-center justify-center gap-2 px-4 py-2 font-bold text-white bg-purple-600 border-2 border-purple-800 rounded-md shadow-lg hover:bg-purple-700 focus:outline-none transition-all duration-200 transform hover:scale-105 disabled:opacity-60 disabled:cursor-wait disabled:transform-none"
        disabled={isLoading || !prompt.trim()}
      >
        <WandIcon className="w-5 h-5" />
        {isLoading ? 'Generating...' : 'Generate'}
      </button>
    </form>
  );
};

export default IdeaInput;