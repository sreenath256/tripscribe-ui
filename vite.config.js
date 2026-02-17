import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    Sitemap({
      hostname: 'https://www.tripscribe.com', // Replace with your actual live domain
      dynamicRoutes: [
        '/',
        '/about',
        '/contact',
      ]
    })
  ],
})