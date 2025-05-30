import type { Schema, Struct } from '@strapi/strapi';

export interface BlogImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_blog_image_blocks';
  info: {
    displayName: 'image-block';
  };
  attributes: {
    image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface BlogQuoteBlock extends Struct.ComponentSchema {
  collectionName: 'components_blog_quote_blocks';
  info: {
    displayName: 'quote-block';
  };
  attributes: {
    author: Schema.Attribute.String;
    quote: Schema.Attribute.String;
  };
}

export interface BlogTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_blog_text_blocks';
  info: {
    displayName: 'text-block';
  };
  attributes: {
    markdown: Schema.Attribute.RichText;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blog.image-block': BlogImageBlock;
      'blog.quote-block': BlogQuoteBlock;
      'blog.text-block': BlogTextBlock;
    }
  }
}
