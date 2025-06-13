import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	base: './', // For static hosting compatibility
	build: {
		outDir: 'dist',
		assetsDir: 'assets',
		sourcemap: false
	}
});
