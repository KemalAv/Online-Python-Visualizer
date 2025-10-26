import React from 'react';
import { PlayIcon } from './icons/PlayIcon.tsx';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  onVisualize: () => void;
  isLoading: boolean;
  loadingText: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode, onVisualize, isLoading, loadingText }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      // Move cursor after the inserted spaces
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2;
      }, 0);
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 border-2 border-t-white border-l-white border-r-gray-400 border-b-gray-400 rounded-md shadow-lg h-full min-h-[40vh] md:min-h-[400px]">
      <div className="flex-shrink-0 p-2 border-b-2 border-gray-400 flex justify-between items-center bg-gradient-to-b from-gray-300 to-gray-200 rounded-t-sm">
        <h2 className="text-lg font-bold text-gray-800">Python Code</h2>
        <button
          onClick={onVisualize}
          className="flex items-center justify-center gap-2 px-5 py-1 font-bold text-white bg-blue-600 border-2 border-blue-800 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none transition-all duration-200 transform hover:scale-105 disabled:opacity-60 disabled:cursor-wait disabled:transform-none"
          disabled={isLoading}
        >
          <PlayIcon className="w-5 h-5" />
          {isLoading ? loadingText : 'Visualize'}
        </button>
      </div>
      <div className="flex-grow p-1 bg-white">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your Python code here..."
          className="w-full h-full p-3 bg-white text-black font-mono resize-none focus:outline-none"
          spellCheck="false"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default CodeEditor;