export interface FileItem {
  name: string;
  type: 'file' | 'folder';
  size?: number;
  lastModified?: Date;
  folder: string;
}

export interface SidebarItem {
  name: string;
  icon: string;
  id: string;
}

export interface HoveredFile {
  item: FileItem;
  x: number;
  y: number;
}

export type ViewMode = 'grid' | 'list'; 