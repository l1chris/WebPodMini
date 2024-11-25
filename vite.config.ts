import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), svgr(), dts()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'IPod',
      fileName: (format) => `ipod.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
