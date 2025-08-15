import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: env.VITE_PORT ? parseInt(env.VITE_PORT) : 5173,
      open: true,
    },
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});
