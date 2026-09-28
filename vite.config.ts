import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Göreli yol ('./'), ileride masaüstü paketine koyarken işimizi kolaylaştırır.
export default defineConfig({
  base: './',
  plugins: [react()],
});
