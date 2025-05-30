import { Box, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { parseMarkdown } from "../lib/markdown";
import { ContentBlock, ImageData } from "@/types/blogs";

export async function renderContentBlock(block: ContentBlock, index: number) {
  switch (block.__component) {
    case "blog.text-block":
      const html = await parseMarkdown(block.markdown || "");
      return (
        <Box key={block.id + index} mt={2}>
          <Paper 
            elevation={0}
            sx={{
              p: 2,
              '& h1': { typography: 'h1', mb: 2, color: 'text.primary' },
              '& h2': { typography: 'h2', mb: 2, color: 'text.primary' },
              '& h3': { typography: 'h3', mb: 2, color: 'text.primary' },
              '& p': { typography: 'body1', mb: 2, color: 'text.secondary' },
              '& a': { color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
              '& code': { 
                bgcolor: 'grey.100', 
                px: 1, 
                py: 0.5, 
                borderRadius: 1,
                fontFamily: 'monospace'
              },
              '& blockquote': {
                borderLeft: 4,
                borderColor: 'grey.300',
                pl: 2,
                py: 1,
                my: 2,
                fontStyle: 'italic'
              }
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Paper>
        </Box>
      );
    case "blog.quote-block":
      return (
        <Box
          key={block.id + index}
          mt={2}
          pl={2}
          borderLeft={4}
          borderColor="grey.400"
        >
          <Typography fontStyle="italic">{block.quote}</Typography>
          <Typography variant="caption">— {block.author}</Typography>
        </Box>
      );
    case "blog.image-block":
      const baseUrl = "http://localhost:1337"; // Add your Strapi base URL
      if(!block.image) return null;
      return (
        <Box key={block.id + index} mt={2}>
          {Array.isArray(block.image) ? (
            block.image.map((image: ImageData, index: number) => (
              <Box key={index} mb={2}>
                <Image
                  src={`${baseUrl}${image.formats.thumbnail.url}`}
                  alt={image.alt || ""}
                  width={500}
                  height={300}
                  style={{ maxWidth: "100%" }}
                />
              </Box>
            ))
          ) : (
            <Image
              src={`${baseUrl}${block.image.formats.thumbnail.url}`}
              alt={block.image.alt || ""}
              width={500}
              height={300}
              style={{ maxWidth: "100%" }}
            />
          )}
        </Box>
      );
    default:
      return null;
  }
}
