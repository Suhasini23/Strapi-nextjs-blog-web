# 📰 Fullstack Blog – Next.js + Strapi + MUI

This is a modern fullstack blog built with:

- **Frontend**: Next.js 15 (App Router) + Material UI
- **Backend**: Strapi v5 Headless CMS

---

### 📦 Requirements

- Node.js ≥ 16 (Node 18 recommended)
- npm (v8+ recommended)

---


#### 1️⃣ Start the Backend (Strapi)

In one terminal:

```bash
cd backend
npm install
npm run develop
```

#### 1️⃣ Start the Frontend (Next)

In second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
frontend/
  src/
    app/            # Next.js App Router pages and layouts
      blog/
        [slug]/     # Dynamic blog post pages
    types/          # TypeScript types for blog and content blocks
    utils/          # Utility functions (e.g., content rendering)
    libs/           # markdown utils
  public/           # Static assets

```
---

## Scalability

- **ISR (Incremental Static Regeneration):**  
  Pages are pre-rendered and revalidated every 30 seconds, ensuring fresh content without redeploys.
- **Efficient Data Fetching:**  
  Only changed pages are regenerated, reducing load on Strapi and improving performance.
- **CDN Caching:**  
  Static pages are cached at the edge for fast global delivery.

---

## Customization

- **Change revalidation interval:**  
  Edit `export const revalidate = 30;` in your page files to control how often content updates.
- **Add new content types:**  
  Extend Strapi models and update TypeScript types in `src/types/`.

---

## Further Improvements

- Add authentication for private content.
- Implement pagination for large blog lists.
- Move API URLs to environment variables for production.
- Add error handling and loading states.

---

## Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Strapi Documentation](https://docs.strapi.io/)
- [Material UI](https://mui.com/)