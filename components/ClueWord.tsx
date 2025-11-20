
import React from 'react';

type ClueWordColor = 'gray' | 'orange' | 'yellow';

interface ClueWordProps {
  text: string;
  color: ClueWordColor;
  onWordClick: (word: string) => void;
}

const colorStyles: Record<ClueWordColor, { bg: string; dot: string }> = {
  gray: {
    bg: 'bg-brand-gray',
    dot: 'border-gray-400',
  },
  orange: {
    bg: 'bg-brand-orange',
    dot: 'border-orange-500',
  },
  yellow: {
    bg: 'bg-brand-yellow',
    dot: 'border-yellow-600',
  },
};

const ClueWord: React.FC<ClueWordProps> = ({ text, color, onWordClick }) => {
  const styles = colorStyles[color];
  const words = text.split(' ');

  return (
    <div className={`rounded-lg px-2 py-1 text-xl font-serif font-bold tracking-tight inline-flex flex-wrap items-baseline gap-x-2 ${styles.bg}`}>
      {words.map((word, index) => (
        <button
          key={index}
          onClick={() => onWordClick(word)}
          className="bg-transparent border-none p-0 appearance-none focus:outline-none focus:ring-1 focus:ring-black/50 rounded"
        >
          <span className={`border-b-2 border-dotted ${styles.dot}`}>
            {word}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ClueWord;
