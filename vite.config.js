import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
	optimizeDeps: {
		exclude: ["cubing", "cubing/search"]
	},
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'), // Alias for src/
		},
	},
});
