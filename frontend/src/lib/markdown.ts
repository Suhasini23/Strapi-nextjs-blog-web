import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

export async function parseMarkdown(markdown: string) {
  const result = await remark()
    .use(remarkGfm)
    .use(html)
    .process(markdown);

  return result.toString();
}
