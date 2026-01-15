import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/tour': {
        target: 'https://apis.data.go.kr',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => {
          const [pathOnly, queryString] = path.split('?');
          const newPath = pathOnly.replace(/^\/api\/tour/, '/B551011/KorService2');
          return queryString ? `${newPath}?${queryString}` : newPath;
        },
      },
    },
  },
})