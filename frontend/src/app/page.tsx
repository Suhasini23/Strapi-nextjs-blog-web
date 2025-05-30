import { Card, CardContent, Typography, Avatar, Stack } from "@mui/material";
import Link from "next/link";

type BlogPost = {
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
    avatar?: {name: string, bio: string, avatar: string}
  } | null;
  content: {
    __component: string;
    id: number;
    quote?: string | null;
    author?: string | null;
    text?: string | null;
  }[];
};

async function getBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch(
    "http://localhost:1337/api/blogs?populate=author",
    { next: { revalidate: 30 } } // Revalidate every 60 seconds
  );
  const data = await res.json();
  return data.data;
}

export default async function BlogList() {
  const posts = await getBlogPosts();

  return (
    <Stack spacing={3} sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Blog Posts
      </Typography>
      {posts.map((post: BlogPost) => {
        const { title, author } = post;
        const name = author?.name;
        const avatarUrl = author?.avatar;

        return (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  {avatarUrl && (
                    <Avatar
                      src={`http://localhost:1337${avatarUrl}`}
                      alt={name}
                    />
                  )}
                  <div>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      by {name}
                    </Typography>
                  </div>
                </Stack>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </Stack>
  );
}
