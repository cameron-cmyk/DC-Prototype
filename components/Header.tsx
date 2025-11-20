
import React from 'react';

interface HeaderProps {
  onBack?: () => void;
  showTabs?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onBack, showTabs = true }) => {
  return (
    <header className="bg-transparent sticky top-0 z-10">
      <div className="flex items-center justify-between p-4">
        {onBack ? (
          <button
            onClick={onBack}
            className="w-10 h-10 bg-brand-brown rounded-full flex items-center justify-center"
            aria-label="Back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : <div className="w-10 h-10"></div>}
        <h1 className="text-lg font-semibold font-serif">Decrypted Crossword</h1>
        <div className="w-10 h-10"></div>
      </div>
      {showTabs && (
        <div className="border-b border-gray-200">
          <div className="flex items-center space-x-6 px-4">
            <span className="py-3 text-sm font-medium text-gray-500">
              Today's theme
            </span>
            <span className="py-3 text-sm font-medium text-gray-800">
              Hidden words
            </span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
