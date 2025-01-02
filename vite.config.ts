import type {UserConfig} from 'vite';

export default {
	publicDir: 'docs',
	build: {
		target: 'esnext',
		rollupOptions: {
			output	: {
				entryFileNames: 'web.js',
			//	chunkFileNames: 'vendor.js',
			},
		},
		outDir: 'docs',
		emptyOutDir: false,
		copyPublicDir: false,
		chunkSizeWarningLimit: 760,
	},
	server: {
		port: 8082,
	}
} satisfies UserConfig;