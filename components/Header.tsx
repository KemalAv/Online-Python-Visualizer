import React from 'react';
import { PythonIcon } from './icons/PythonIcon.tsx';

const Header: React.FC = () => {
  return (
    <header className="text-center py-3 border-b-2 border-blue-800 bg-gradient-to-b from-blue-500 to-blue-700 shadow-lg sticky top-0 z-10">
      <div className="flex items-center justify-center gap-4 px-2">
        <PythonIcon className="w-10 h-10 text-yellow-400" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Online Python Visualizer
          </h1>
          <p className="text-sm sm:text-base text-blue-100">Instantly run and visualize Python data science code</p>
        </div>
      </div>
    </header>
  );
};

export default Header;