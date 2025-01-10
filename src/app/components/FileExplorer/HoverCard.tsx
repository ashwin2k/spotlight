'use client';

import { HoveredFile } from '@/types/explorer';
import { formatDate } from './utils';

interface HoverCardProps {
  hoveredFile: HoveredFile;
}

export default function HoverCard({ hoveredFile }: HoverCardProps) {
  return (
    <div
      className="fixed bg-white shadow-lg rounded-lg p-4 border border-[#e5e5e5] w-64"
      style={{
        top: hoveredFile.y,
        left: hoveredFile.x,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        {hoveredFile.item.type === 'folder' ? (
          <svg className="w-8 h-8 text-[#ffd75c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-[#5c9aff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )}
        <div>
          <h3 className="font-medium text-[#333333]">{hoveredFile.item.name}</h3>
          <p className="text-xs text-[#666666]">{hoveredFile.item.type === 'folder' ? 'Folder' : 'File'}</p>
        </div>
      </div>
      <div className="space-y-1 text-sm">
        {hoveredFile.item.size && (
          <p className="text-[#666666]">
            Size: {(hoveredFile.item.size / 1024).toFixed(2)} KB
          </p>
        )}
        {hoveredFile.item.lastModified && (
          <p className="text-[#666666]">
            Modified: {formatDate(hoveredFile.item.lastModified)}
          </p>
        )}
      </div>
    </div>
  );
} 