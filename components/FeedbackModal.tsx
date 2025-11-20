
import React from 'react';

interface FeedbackModalProps {
  isOpen: boolean;
  status: 'correct' | 'incorrect' | 'idle';
  onClose: () => void;
  onSolve: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, status, onClose, onSolve }) => {
  if (!isOpen) return null;

  const isCorrect = status === 'correct';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog">
      <div className="bg-white rounded-2xl p-6 text-center max-w-sm w-full shadow-xl">
        {isCorrect ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Excellent!</h2>
            <p className="text-gray-600 mb-6">You've correctly decrypted the clue.</p>
            <button
              onClick={onSolve}
              className="w-full bg-green-500 text-white py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Solve Clue
            </button>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Not Quite</h2>
            <p className="text-gray-600 mb-6">Some parts are in the wrong place. Give it another try!</p>
            <button
              onClick={onClose}
              className="w-full bg-red-500 text-white py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;