'use client';

import { ViewMode } from '@/types/explorer';

interface ToolbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onFilesUpload: (files: FileList) => void;
}

export default function Toolbar({ viewMode, onViewModeChange, onFilesUpload }: ToolbarProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesUpload(e.target.files);
      // Reset the input value so the same file can be uploaded again
      e.target.value = '';
    }
  };

  return (
    <div className="h-12 border-b border-[#e5e5e5] flex items-center px-2 gap-1 bg-[#fafafa]">
      <button className="p-2 hover:bg-[#e9e9e9] rounded" title="Back">
        <svg className="w-4 h-4 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="p-2 hover:bg-[#e9e9e9] rounded" title="Forward">
        <svg className="w-4 h-4 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <div className="h-6 mx-1 w-px bg-[#e5e5e5]"></div>
      <div className="flex gap-1">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#e9e9e9]' : 'hover:bg-[#e9e9e9]'}`}
          title="Grid view"
        >
          <svg className="w-4 h-4 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#e9e9e9]' : 'hover:bg-[#e9e9e9]'}`}
          title="List view"
        >
          <svg className="w-4 h-4 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <div className="h-6 mx-1 w-px bg-[#e5e5e5]"></div>
      <label className="p-2 hover:bg-[#e9e9e9] rounded cursor-pointer flex items-center gap-2" title="Upload files">
        <svg className="w-4 h-4 text-[#666666]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        <span className="text-sm text-[#666666]">Upload</span>
        <input
          type="file"
          className="hidden"
          onChange={handleFileUpload}
          multiple
        />
      </label>
    </div>
  );
} 