
import React from 'react';
import { Word } from '../types';

interface WordPillProps {
  word: Word;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, wordId: number) => void;
  isPlaceholder?: boolean;
}

const WordPill: React.FC<WordPillProps> = ({ word, onDragStart, isPlaceholder }) => {
  const className = isPlaceholder
    ? "bg-gray-200 rounded-full px-4 py-2 text-base font-medium text-transparent select-none cursor-grabbing"
    : "bg-white border border-gray-300 rounded-full px-4 py-2 text-base font-medium cursor-grab active:cursor-grabbing shadow-sm transition-opacity";

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, word.id)}
      className={className}
    >
      {word.text}
    </div>
  );
};

export default WordPill;