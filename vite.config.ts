/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2025-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {UserConfig} from 'vite';
import {CustomHmr} from './src/CustomHmr';

export default {
	base: '/SKYNovel_gallery/',
	build: {
		target: 'esnext',
		rolldownOptions: {
			output	: {
				entryFileNames: 'web.js',
				chunkFileNames: `assets/[name].js`,
				assetFileNames: `assets/[name].[ext]`,
			},
		},
		chunkSizeWarningLimit: 780,
	},
	server: {port: 8082},
	plugins: [CustomHmr()],
} satisfies UserConfig;
