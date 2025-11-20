import React, { useState, useRef } from 'react';
import Header from './Header';

interface UploadScreenProps {
  onBack: () => void;
  onCluesUpload: (file: File) => void;
  onDictionaryUpload: (file: File) => void;
  onUrlUpdate: (url: string) => void;
  currentUrl: string;
}

const UploadScreen: React.FC<UploadScreenProps> = ({ onBack, onCluesUpload, onDictionaryUpload, onUrlUpdate, currentUrl }) => {
  const [cluesFile, setCluesFile] = useState<File | null>(null);
  const [dictionaryFile, setDictionaryFile] = useState<File | null>(null);
  const [url, setUrl] = useState(currentUrl);

  const cluesInputRef = useRef<HTMLInputElement>(null);
  const dictionaryInputRef = useRef<HTMLInputElement>(null);

  const handleCluesFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCluesFile(file);
    }
  };

  const handleDictionaryFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDictionaryFile(file);
    }
  };

  const handleSaveChanges = () => {
    if (cluesFile) {
      onCluesUpload(cluesFile);
    }
    if (dictionaryFile) {
      onDictionaryUpload(dictionaryFile);
    }
    onUrlUpdate(url);
    onBack();
  };

  const renderFileState = (file: File | null) => {
    if (file) {
      return (
        <div className="flex items-center gap-2 text-sm text-green-700 mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>{file.name}</span>
        </div>
      );
    }
    return <p className="text-sm text-gray-500 mt-1">No file selected.</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 flex items-center justify-center p-0 md:p-4">
      <div className="w-full max-w-md h-screen md:h-[900px] bg-white flex flex-col overflow-hidden md:rounded-2xl md:shadow-xl">
        <Header onBack={onBack} showTabs={false} />
        <main className="flex-grow p-6 space-y-6">
          <h2 className="font-serif text-3xl font-bold">Upload Content</h2>
          
          {/* Clues Upload */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Clues CSV</h3>
            <p className="text-sm text-gray-600">Upload one clue per difficulty (Easy, Medium, Hard). Include columns for Answer, Number of letters, Indicator, Wordplay, and Definition.</p>
            <input
              type="file"
              accept=".csv"
              ref={cluesInputRef}
              onChange={handleCluesFileChange}
              className="hidden"
              aria-hidden="true"
            />
            <button onClick={() => cluesInputRef.current?.click()} className="w-full text-center px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Choose Clues File...
            </button>
            {renderFileState(cluesFile)}
          </div>

          {/* Dictionary Upload */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Dictionary CSV</h3>
            <p className="text-sm text-gray-600">The dictionary file provides definitions for words in the clues.</p>
            <input
              type="file"
              accept=".csv"
              ref={dictionaryInputRef}
              onChange={handleDictionaryFileChange}
              className="hidden"
              aria-hidden="true"
            />
            <button onClick={() => dictionaryInputRef.current?.click()} className="w-full text-center px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Choose Dictionary File...
            </button>
            {renderFileState(dictionaryFile)}
          </div>

          {/* Website Link */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Success URL</h3>
            <p className="text-sm text-gray-600">This link will be the destination after solving the 'Hard' difficulty clue.</p>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border-2 border-black rounded-lg text-black bg-white focus:outline-none"
            />
          </div>
        </main>
        <footer className="p-4 bg-white border-t border-gray-200 md:rounded-b-2xl">
          <button
            onClick={handleSaveChanges}
            className="w-full bg-brand-brown text-white py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-brown"
          >
            Save Changes
          </button>
        </footer>
      </div>
    </div>
  );
};

export default UploadScreen;