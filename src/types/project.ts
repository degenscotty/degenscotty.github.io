export type ProjectCategory = 'programming' | 'art';

export type MediaType = 'image' | 'gif' | 'youtube';

export interface Media {
  type: MediaType;
  src: string;
  alt?: string;
  caption?: string;
}

export type ContentBlockType = 'heading' | 'paragraph' | 'media' | 'media-grid';

export interface HeadingBlock {
  type: 'heading';
  text: string;
  level?: 2 | 3 | 4;
}

export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface MediaBlock {
  type: 'media';
  media: Media;
}

export interface MediaGridBlock {
  type: 'media-grid';
  media: Media[];
  columns?: 2 | 3 | 4;
}

export type ContentBlock = HeadingBlock | ParagraphBlock | MediaBlock | MediaGridBlock;

export type LinkIcon = 'github' | 'external' | 'download' | 'video';

export interface ProjectLink {
  label: string;
  url: string;
  icon?: LinkIcon;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  thumbnail: string;
  shortDescription: string;
  technologies?: string[];
  content: ContentBlock[];
  links?: ProjectLink[];
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  email: string;
  social: {
    github?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}
