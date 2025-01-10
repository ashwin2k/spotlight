'use client';

import { useEffect, useState, useRef } from 'react';
import { FileItem } from '@/types/explorer';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
}

export default function SearchModal({ isOpen, onClose, files, onFileSelect }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    const handleGlobalEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleGlobalEscape);
    return () => window.removeEventListener('keydown', handleGlobalEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredFiles.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
    } else if (e.key === 'Enter' && filteredFiles.length > 0) {
      onFileSelect(filteredFiles[selectedIndex]);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-[20vh] z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-[600px] max-h-[400px] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search files..."
            className="flex-1 outline-none text-lg text-gray-900 placeholder-gray-400"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-600">↑↓</kbd>
            <span>to navigate</span>
            <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-600">enter</kbd>
            <span>to select</span>
            <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-600">esc</kbd>
            <span>to close</span>
          </div>
        </div>
        <div className="overflow-auto flex-1">
          {filteredFiles.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No files found
            </div>
          ) : (
            <div className="py-2">
              {filteredFiles.map((file, index) => (
                <div
                  key={`${file.folder}-${file.name}`}
                  className={`px-4 py-2 flex items-center gap-3 cursor-pointer ${
                    index === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    onFileSelect(file);
                    onClose();
                  }}
                >
                  {file.type === 'folder' ? (
                    <svg className="w-5 h-5 text-[#ffd75c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-[#5c9aff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  )}
                  <div>
                    <div className="text-sm font-medium text-gray-900">{file.name}</div>
                    <div className="text-xs text-gray-500">in {file.folder}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 