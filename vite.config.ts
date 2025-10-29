/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2025-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {UserConfig} from 'vite';
import {CustomHmr} from './src/CustomHmr';

export default {
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
		chunkSizeWarningLimit: 780,
	},
	server: {port: 8082},
	plugins: [CustomHmr()],
} satisfies UserConfig;
