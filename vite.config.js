import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'
import { URL } from './src/Common/api'

export default defineConfig(async () => {
  let cmsBlogRoutes = [];

  try {
    const cmsResponse = await fetch(`${URL}/public/blogs`);
    const cmsData = await cmsResponse.json();

    if (cmsData && cmsData.blogs) {
      cmsBlogRoutes = cmsData.blogs.map(blog => `/blogs/${blog.slug}`);
    }
  } catch (error) {
    console.error('Failed to fetch CMS blogs for sitemap:', error);
  }

  // Combine static routes with dynamic routes
  const allRoutes = [
    '/',
    '/about',
    '/contact',
    '/blogs',
    ...cmsBlogRoutes
  ];

  // ✅ YOU MUST RETURN THE OBJECT
  return {
    plugins: [
      tailwindcss(),
      react(),
      Sitemap({
        hostname: 'https://tripscribe.in',
        dynamicRoutes: allRoutes // ✅ USE THE ARRAY YOU CREATED HERE
      })
    ],
  };
})