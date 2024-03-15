import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/vk-test-app/', // for gh-pages
  base: './',               // for vk-mini-apps
  plugins: [react()],
})
