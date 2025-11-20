
import React from 'react';

interface SolveSuccessModalProps {
  isOpen: boolean;
  onPlayAnother: () => void;
  isHardDifficulty: boolean;
  onClose: () => void;
  successUrl?: string;
}

const SolveSuccessModal: React.FC<SolveSuccessModalProps> = ({ isOpen, onPlayAnother, isHardDifficulty, onClose, successUrl }) => {
  if (!isOpen) return null;

  const buttonText = isHardDifficulty ? "Play Quick Cryptic" : "Play another difficulty";
  
  const handlePrimaryAction = () => {
    if (isHardDifficulty && successUrl) {
      window.open(successUrl, '_blank', 'noopener,noreferrer');
      onClose(); // Or onPlayAnother if you want to reset the game in the background.
    } else {
      onPlayAnother();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
      <div className="bg-white rounded-2xl p-6 text-center max-w-sm w-full shadow-xl">
        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Puzzle Solved!</h2>
        <p className="text-gray-600 mb-6">You've successfully found the hidden word. Ready for the next challenge?</p>
        <button
          onClick={handlePrimaryAction}
          className="w-full bg-green-500 text-white py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors"
        >
          {buttonText}
        </button>
        <button
          onClick={onClose}
          className="w-full bg-transparent text-gray-800 py-3 rounded-full text-lg font-semibold border border-black hover:bg-gray-100 transition-colors mt-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SolveSuccessModal;
