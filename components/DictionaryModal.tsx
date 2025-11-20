
import React, { useState, useEffect } from 'react';
import { Dictionary } from '../types';

interface DictionaryModalProps {
  word: string | null;
  onClose: () => void;
  dictionary: Dictionary;
}

const useColorStyles: Record<string, { bg: string; text: string; ring: string; }> = {
  'Indicator': {
    bg: 'bg-brand-orange',
    text: 'text-orange-900',
    ring: 'ring-brand-orange-border',
  },
  'Wordplay': {
    bg: 'bg-brand-yellow',
    text: 'text-yellow-900',
    ring: 'ring-brand-yellow-border',
  },
  'Definition': {
    bg: 'bg-brand-gray',
    text: 'text-gray-800',
    ring: 'ring-brand-gray-border',
  },
  'default': {
    bg: 'bg-gray-200',
    text: 'text-gray-800',
    ring: 'ring-gray-400',
  }
};


const DictionaryModal: React.FC<DictionaryModalProps> = ({ word, onClose, dictionary }) => {
  const [selectedUse, setSelectedUse] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (word) {
      setIsClosing(false);
      // Reset selected use when word changes
      setSelectedUse(null);
    }
  }, [word]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Wait for animation to finish
  };

  if (!word) {
    return null;
  }

  const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
  const entry = dictionary[cleanWord];

  const handleSelectUse = (use: string) => {
    setSelectedUse(prev => (prev === use ? null : use));
  };

  const modalAnimationClass = isClosing ? 'animate-fade-out-scale' : 'animate-fade-in-scale';
  const backdropAnimationClass = isClosing ? 'animate-fade-out' : 'animate-fade-in';

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4 ${backdropAnimationClass}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dictionary-title"
    >
      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale { animation: fade-in-scale 0.3s ease-out forwards; }

        @keyframes fade-out-scale {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.95); }
        }
        .animate-fade-out-scale { animation: fade-out-scale 0.3s ease-in forwards; }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }

        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .animate-fade-out { animation: fade-out 0.3s ease-in forwards; }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl shadow-2xl p-4 w-full max-w-md ${modalAnimationClass}`}
      >
        <header className="flex justify-between items-center mb-4">
          <h2 id="dictionary-title" className="text-2xl font-serif font-bold text-gray-800">Cryptic dictionary</h2>
          <button
            onClick={handleClose}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Close dictionary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <h3 className="text-2xl font-serif mb-4 capitalize">{cleanWord}</h3>

        {entry ? (
          <>
            {selectedUse && (
              <div className={`${(useColorStyles[selectedUse] || useColorStyles.default).bg} p-4 rounded-lg mb-4`}>
                <h4 className="font-bold text-lg">{selectedUse}</h4>
                <p className="mt-1 text-gray-700">{entry.uses[selectedUse]}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(entry.uses).map(use => {
                const specialUses = ['Indicator', 'Wordplay', 'Definition'];
                const isSpecialUse = specialUses.includes(use);
                const styles = useColorStyles[use] || useColorStyles.default;
                const isSelected = selectedUse === use;

                let buttonClasses;

                if (isSelected) {
                  buttonClasses = `${styles.bg} ${styles.text} ring-2 ${styles.ring}`;
                } else {
                  if (isSpecialUse) {
                    buttonClasses = `${styles.bg} ${styles.text} hover:brightness-105`;
                  } else {
                    buttonClasses = 'bg-gray-100 text-gray-700 hover:bg-gray-200';
                  }
                }
                
                return (
                  <button
                    key={use}
                    onClick={() => handleSelectUse(use)}
                    className={`p-3 rounded-lg text-left text-lg font-semibold transition-all ${buttonClasses}`}
                  >
                    {use}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <p className="text-gray-600">No entry found for this word.</p>
        )}
      </div>
    </div>
  );
};

export default DictionaryModal;
