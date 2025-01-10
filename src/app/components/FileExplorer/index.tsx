'use client';

import { useEffect, useState } from 'react';
import { FileItem, HoveredFile, ViewMode } from '@/types/explorer';
import { SIDEBAR_ITEMS } from './constants';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import FileList from './FileList';
import HoverCard from './HoverCard';

export default function FileExplorer() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [hoveredFile, setHoveredFile] = useState<HoveredFile | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>(SIDEBAR_ITEMS[0].id);

  // Debug useEffect to track state changes
  useEffect(() => {
    console.log('Selected folder changed to:', selectedFolder);
    console.log('All files:', files);
    console.log('Files in current folder:', files.filter(f => f.folder === selectedFolder));
  }, [selectedFolder, files]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).map((file) => ({
      name: file.name,
      type: file.type === '' ? 'folder' as const : 'file' as const,
      size: file.size,
      lastModified: new Date(file.lastModified),
      folder: selectedFolder,
    }));

    console.log('Adding files to folder:', selectedFolder, droppedFiles);
    setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
  };

  const handleFilesUpload = (fileList: FileList) => {
    const uploadedFiles = Array.from(fileList).map((file) => ({
      name: file.name,
      type: file.type === '' ? 'folder' as const : 'file' as const,
      size: file.size,
      lastModified: new Date(file.lastModified),
      folder: selectedFolder,
    }));

    console.log('Uploading files to folder:', selectedFolder, uploadedFiles);
    setFiles(prevFiles => [...prevFiles, ...uploadedFiles]);
  };

  const handleMouseEnter = (e: React.MouseEvent, file: FileItem) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setHoveredFile({
      item: file,
      x: rect.right + 10,
      y: rect.top,
    });
  };

  const handleMouseLeave = () => {
    setHoveredFile(null);
  };

  const handleFolderSelect = (folderId: string) => {
    console.log('Selecting folder:', folderId);
    setSelectedFolder(folderId);
  };

  // Filter files for the current folder
  const currentFolderFiles = files.filter(file => file.folder === selectedFolder);

  return (
    <div className="fixed inset-0 flex bg-[#f3f3f3]">
      <Sidebar selectedFolder={selectedFolder} onFolderSelect={handleFolderSelect} />
      <div className="flex-1 flex flex-col">
        <Toolbar 
          viewMode={viewMode} 
          onViewModeChange={setViewMode} 
          onFilesUpload={handleFilesUpload}
        />
        <div
          className={`flex-1 p-4 ${isDragging ? 'bg-[#f0f5ff]' : 'bg-white'} overflow-auto relative`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FileList
            files={currentFolderFiles}
            viewMode={viewMode}
            selectedFolder={selectedFolder}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          {hoveredFile && <HoverCard hoveredFile={hoveredFile} />}
        </div>
      </div>
    </div>
  );
} 