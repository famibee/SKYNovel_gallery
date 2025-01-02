import type {UserConfig} from 'vite';

export default {
	publicDir: 'docs',
	base: './',
	build: {
		target: 'esnext',
		rollupOptions: {
			output	: {
				entryFileNames: 'web.js',
				chunkFileNames: `assets/[name].js`,
				assetFileNames: `assets/[name].[ext]`,
			},
		},
		outDir: 'docs',
		emptyOutDir: false,
		copyPublicDir: false,
		chunkSizeWarningLimit: 780,
	},
	server: {
		port: 8082,
	}
} satisfies UserConfig;