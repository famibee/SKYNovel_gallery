import type {UserConfig} from 'vite';

export default {
	build: {
		target: 'esnext',
		rollupOptions: {
			output	: {
				entryFileNames: 'web.js',
			//	chunkFileNames: 'vendor.js',
			},
		},
		outDir: 'docs',
	},
	server: {
		port: 8082,
	}
} satisfies UserConfig;