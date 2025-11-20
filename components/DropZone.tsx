
import React, { ReactNode } from 'react';
import { WordLocation } from '../types';

interface DropZoneProps {
  title: string;
  location: WordLocation;
  onDrop: (e: React.DragEvent<HTMLDivElement>, location: WordLocation) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>, location: WordLocation) => void;
  isDraggedOver: boolean;
  bgColor: string;
  borderColor: string;
  children: ReactNode;
}

const DropZone: React.FC<DropZoneProps> = ({ title, location, onDrop, onDragOver, onDragEnter, isDraggedOver, bgColor, borderColor, children }) => {
  const hasChildren = React.Children.count(children) > 0;
  
  const ringColorMap: { [key: string]: string } = {
    'border-brand-orange-border': 'ring-brand-orange-border',
    'border-brand-yellow-border': 'ring-brand-yellow-border',
    'border-brand-gray-border': 'ring-brand-gray-border',
  }

  const draggedOverClass = isDraggedOver ? `ring-2 ring-offset-2 ${ringColorMap[borderColor]}` : '';

  return (
    <div>
      <h2 className="text-sm font-medium text-gray-600 mb-1">{title}</h2>
      <div
        onDrop={(e) => onDrop(e, location)}
        onDragOver={onDragOver}
        onDragEnter={(e) => onDragEnter(e, location)}
        className={`p-2 min-h-[3.5rem] border-2 rounded-xl flex flex-wrap gap-2 items-center transition-all ${bgColor} ${borderColor} border-solid ${draggedOverClass}`}
      >
        {children}
        {!hasChildren && <span className="text-gray-400 pl-2 text-sm invisible">Drop here</span>}
      </div>
    </div>
  );
};

export default DropZone;