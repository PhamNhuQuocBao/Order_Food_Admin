import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000, // Lắng nghe trên cổng từ biến môi trường hoặc cổng mặc định 3000
    host: '0.0.0.0', // Đảm bảo Vite lắng nghe trên mọi IP
  },
})
