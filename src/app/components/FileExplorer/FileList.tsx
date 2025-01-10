'use client';

import { FileItem, ViewMode } from '@/types/explorer';
import { formatDate } from './utils';

interface FileListProps {
  files: FileItem[];
  viewMode: ViewMode;
  selectedFolder: string;
  onMouseEnter: (e: React.MouseEvent, file: FileItem) => void;
  onMouseLeave: () => void;
}

export default function FileList({ files, viewMode, selectedFolder, onMouseEnter, onMouseLeave }: FileListProps) {
  if (files.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-[#666666] gap-2">
        <p>No files in {selectedFolder}</p>
        <p className="text-sm">Drag and drop files here</p>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-6 gap-4">
        {files.map((file, index) => (
          <div
            key={`${file.name}-${index}`}
            className="flex flex-col items-center p-3 hover:bg-[#f0f5ff] rounded cursor-pointer"
            onMouseEnter={(e) => onMouseEnter(e, file)}
            onMouseLeave={onMouseLeave}
          >
            {file.type === 'folder' ? (
              <svg className="w-16 h-16 text-[#ffd75c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            ) : (
              <svg className="w-16 h-16 text-[#5c9aff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            )}
            <p className="mt-2 text-sm text-[#333333] text-center truncate max-w-full">
              {file.name}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left text-sm text-[#666666] border-b border-[#e5e5e5]">
          <th className="pb-2 font-medium">Name</th>
          <th className="pb-2 font-medium">Date modified</th>
          <th className="pb-2 font-medium">Type</th>
          <th className="pb-2 font-medium">Size</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file, index) => (
          <tr
            key={`${file.name}-${index}`}
            className="border-b border-[#e5e5e5] hover:bg-[#f0f5ff] cursor-pointer"
            onMouseEnter={(e) => onMouseEnter(e, file)}
            onMouseLeave={onMouseLeave}
          >
            <td className="py-1.5 flex items-center gap-2">
              {file.type === 'folder' ? (
                <svg className="w-5 h-5 text-[#ffd75c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-[#5c9aff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              )}
              <span className="text-sm text-[#333333]">{file.name}</span>
            </td>
            <td className="py-1.5 text-sm text-[#666666]">
              {file.lastModified && formatDate(file.lastModified)}
            </td>
            <td className="py-1.5 text-sm text-[#666666]">
              {file.type === 'folder' ? 'Folder' : 'File'}
            </td>
            <td className="py-1.5 text-sm text-[#666666]">
              {file.size ? `${(file.size / 1024).toFixed(2)} KB` : '--'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 