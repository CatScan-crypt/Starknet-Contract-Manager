import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // We need to add this import

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // And add the plugin here
  ],
})