import React from 'react';
import { ExampleType } from '../utils/examples';

interface SidebarProps {
  onSelectExample: (type: ExampleType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onSelectExample
}) => {
  const buttonClasses = "w-full text-left p-2 bg-gradient-to-b from-white to-gray-200 rounded-md hover:from-blue-100 hover:to-blue-200 border border-gray-400 hover:border-blue-500 transition-all duration-200 shadow-sm";

  return (
    <aside className="w-full md:w-1/4 flex-shrink-0 bg-gray-100 border-2 border-t-white border-l-white border-r-gray-400 border-b-gray-400 rounded-md shadow-lg p-5 self-start md:sticky md:top-24">
      
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Load an Example</h2>
        <p className="text-gray-600 mb-6 text-sm">Click to load a pre-made example. The last expression or variable in your code will be rendered.</p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onSelectExample('matplotlib')}
            className={buttonClasses}
          >
            <h3 className="font-semibold">Matplotlib Chart</h3>
            <p className="text-xs text-gray-500">A simple bar chart.</p>
          </button>
          <button
            onClick={() => onSelectExample('pandas')}
            className={buttonClasses}
          >
            <h3 className="font-semibold">Pandas DataFrame</h3>
            <p className="text-xs text-gray-500">An interactive table.</p>
          </button>
          <button
            onClick={() => onSelectExample('seaborn')}
            className={buttonClasses}
          >
            <h3 className="font-semibold">Seaborn Heatmap</h3>
            <p className="text-xs text-gray-500">A statistical heatmap.</p>
          </button>
          <button
            onClick={() => onSelectExample('sklearn')}
            className={buttonClasses}
          >
            <h3 className="font-semibold">Scikit-learn Matrix</h3>
            <p className="text-xs text-gray-500">A confusion matrix plot.</p>
          </button>
          <button
            onClick={() => onSelectExample('networkx')}
            className={buttonClasses}
          >
            <h3 className="font-semibold">NetworkX Graph</h3>
            <p className="text-xs text-gray-500">A social network graph.</p>
          </button>
        </div>
      </div>

       <div className="mt-6 pt-4 border-t-2 border-gray-300">
        <h3 className="font-semibold text-gray-700 mb-2">How it works</h3>
        <p className="text-xs text-gray-500">
          This tool runs Python entirely in your browser using Pyodide (WebAssembly), unlike server-based tools like Streamlit. No code is sent to any server, making it fast, private, and completely free.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
