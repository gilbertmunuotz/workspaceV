import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://workspaceb.vercel.app/',
  //       changeOrigin: true, // Required for CORS
  //       // secure: false, // If your backend uses HTTPS, set to true
  //     },
  //   },
  // },
})