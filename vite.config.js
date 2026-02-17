import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    Sitemap({
      hostname: 'https://tripscribe.in', // Replace with your actual live domain
      dynamicRoutes: [
        '/',
        '/about',
        '/contact',
      ]
    })
  ],
})