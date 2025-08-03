import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
import path from 'path'

export default defineConfig({
	optimizeDeps: {
		exclude: ["cubing", "cubing/search"]
	},
	plugins: [react(), svgr()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'), // Alias for src/
		},
	},
});
