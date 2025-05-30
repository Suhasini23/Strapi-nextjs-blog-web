// frontend/src/types/blog.ts

export interface ImageFormat {
    url: string;
    width: number;
    height: number;
  }
  
  export interface ImageData {
    formats: {
      thumbnail: ImageFormat;
      small?: ImageFormat;
      medium?: ImageFormat;
      large?: ImageFormat;
    };
    url: string;
    alt?: string;
  }
  
  export interface BaseBlock {
    __component: 'blog.image-block' | 'blog.quote-block' | 'blog.text-block';
    id: number;
  }
  
  export interface ImageBlock extends BaseBlock {
    __component: 'blog.image-block';
    image: ImageData | ImageData[];
  }
  
  export interface QuoteBlock extends BaseBlock {
    __component: 'blog.quote-block';
    quote: string | null;
    author: string | null;
  }
  
  export interface TextBlock extends BaseBlock {
    __component: 'blog.text-block';
    markdown: string | null;
  }
  
  export type ContentBlock = ImageBlock | QuoteBlock | TextBlock;
  
  export interface BlogPost {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    author: {
      id: number;
      name: string;
      avatar?: { name: string; bio: string; avatar: string };
    } | null;
    content: ContentBlock[];
  };