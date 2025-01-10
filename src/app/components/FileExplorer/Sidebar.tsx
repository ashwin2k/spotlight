'use client';

import { SIDEBAR_ITEMS } from './constants';

interface SidebarProps {
  selectedFolder: string;
  onFolderSelect: (folderId: string) => void;
}

export default function Sidebar({ selectedFolder, onFolderSelect }: SidebarProps) {
  return (
    <div className="w-56 bg-[#fafafa] border-r border-[#e5e5e5] flex flex-col">
      <div className="p-3 text-sm font-semibold text-[#666666]">Quick access</div>
      {SIDEBAR_ITEMS.map((item) => (
        <button
          key={item.id}
          className={`flex items-center gap-2 w-full px-3 py-1.5 hover:bg-[#e9e9e9] text-left text-sm ${
            selectedFolder === item.id
              ? 'bg-[#e9e9e9] text-[#000000]'
              : 'text-[#333333]'
          }`}
          onClick={() => onFolderSelect(item.id)}
        >
          <span className="text-lg w-6 text-center">{item.icon}</span>
          {item.name}
        </button>
      ))}
    </div>
  );
} 