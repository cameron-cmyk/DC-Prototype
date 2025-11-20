
import React from 'react';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, onDelete }) => {
  const keys1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const keys2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const keys3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  const renderKey = (key: string) => (
    <button
      key={key}
      onClick={() => onKeyPress(key)}
      className="flex-1 h-12 bg-white rounded-md flex items-center justify-center text-lg font-medium hover:bg-gray-200 transition-colors shadow-[0_2px_0_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-px border border-gray-300"
      aria-label={`key ${key}`}
    >
      {key}
    </button>
  );

  return (
    <div className="w-full space-y-2 p-2 bg-gray-200/50">
      <div className="flex space-x-1.5">{keys1.map(renderKey)}</div>
      <div className="flex space-x-1.5 pl-[5%] pr-[5%]">{keys2.map(renderKey)}</div>
      <div className="flex space-x-1.5">
        <div className="w-6 flex-shrink-0"></div>
        {keys3.map(renderKey)}
        <button
          onClick={onDelete}
          className="w-12 flex-shrink-0 h-12 bg-white rounded-md flex items-center justify-center hover:bg-gray-200 transition-colors shadow-[0_2px_0_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-px border border-gray-300"
          aria-label="Delete last character"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9.75L14.25 12m0 0L12 14.25m2.25-2.25L10 14.25m-3.75 4.5h10.5a2.25 2.25 0 002.25-2.25V7.5a2.25 2.25 0 00-2.25-2.25H6.25a2.25 2.25 0 00-2.25 2.25v7.5a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Keyboard;
