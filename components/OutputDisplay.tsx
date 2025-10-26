import React from 'react';
import type { OutputData } from '../types';
import LoadingSpinner from './LoadingSpinner.tsx';

interface OutputDisplayProps {
  output: OutputData | null;
  isLoading: boolean;
  loadingText: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output, isLoading, loadingText }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <LoadingSpinner />
          <p className="mt-4 text-lg text-gray-600">{loadingText}</p>
        </div>
      );
    }
    
    if (!output) {
      return (
        <div className="flex items-center justify-center h-full text-center p-10 m-4 border-2 border-dashed border-gray-400 rounded-md bg-gray-100">
          <div>
            <h3 className="text-xl font-semibold text-gray-600">Output will appear here</h3>
            <p className="text-gray-500 mt-2">Click "Visualize" to run your code.</p>
          </div>
        </div>
      );
    }

    return (
        <div className="p-4 overflow-auto h-full">
            {output.type === 'image' && output.data && (
                <img src={`data:image/png;base64,${output.data}`} alt="Generated plot" className="max-w-full h-auto mx-auto bg-white rounded-md p-2 border border-gray-300 shadow-md"/>
            )}
            {output.type === 'html' && output.data && (
                <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: output.data }} />
            )}
            {output.type === 'error' && output.data && (
                <div>
                    <h4 className="text-lg font-semibold text-red-700 mb-2">Execution Error</h4>
                    <pre className="bg-red-100 text-red-800 p-3 rounded-md text-sm whitespace-pre-wrap break-all border border-red-300">{output.data}</pre>
                </div>
            )}
            {output.type === 'log' && output.data && (
                 <div>
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Logs</h4>
                    <pre className="bg-gray-100 text-gray-800 p-3 rounded-md text-sm whitespace-pre-wrap break-all border border-gray-300">{output.data}</pre>
                </div>
            )}
            {output.logs && (
                <div className="mt-4">
                    <h4 className="text-md font-semibold text-gray-600 mb-2 border-t border-gray-300 pt-4">Captured Logs</h4>
                    <pre className="bg-gray-100 text-gray-600 p-3 rounded-md text-xs whitespace-pre-wrap break-all border border-gray-300">{output.logs}</pre>
                </div>
            )}
             {!output.type && !output.logs && (
                <p className="text-gray-500">Execution finished with no visual output or logs.</p>
            )}
        </div>
    );
  };

  return (
    <div className="bg-gray-50 border-2 border-t-white border-l-white border-r-gray-400 border-b-gray-400 rounded-md shadow-lg h-full min-h-[40vh] md:min-h-[400px] flex flex-col">
      <div className="flex-shrink-0 p-2 border-b-2 border-gray-400 bg-gradient-to-b from-gray-300 to-gray-200 rounded-t-sm">
        <h2 className="text-lg font-bold text-gray-800">Output</h2>
      </div>
      <div className="h-full flex-grow overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default OutputDisplay;