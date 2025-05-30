import type { BlogPost, ContentBlock } from "@/types/blogs";
import { renderContentBlock } from "@/utils/renderContentBlock";
import { Typography } from "@mui/material";
import { Metadata } from "next";

export const generateMetadata = async ({ params }: { params: { slug: string } }): Promise<Metadata> => {
  const res = await fetch(
    `http://localhost:1337/api/blogs?filters[slug][$eq]=${params.slug}&populate=*`
  );
  const data: { data:  BlogPost[] } = await res.json();
  const post = data.data[0];

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'No blog post found for this slug.',
    };
  }

  const { title } = post;

  return {
    title,
    description:  title,
  };
};

export const revalidate = 30; // Enable ISR

export async function generateStaticParams() {
  const res = await fetch("http://localhost:1337/api/blogs");
  const data: { data: BlogPost[] } = await res.json();
  return data.data.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const res = await fetch(
    `http://localhost:1337/api/blogs?filters[slug][$eq]=${params.slug}&populate[author][populate]=avatar&populate[content][populate]=*`
  );
  const data: { data: BlogPost[] } = await res.json();
  const post = data.data[0];

  if (!post) return <div>Post not found</div>;

  const { title, author, content } = post;
  const name = author?.name;

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="subtitle1" gutterBottom>
        by {name}
      </Typography>
      {content?.map((block: ContentBlock, index: number) => renderContentBlock(block, index))}
    </div>
  );
}
  