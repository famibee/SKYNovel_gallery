const ImageminPlugin = require('imagemin-webpack-plugin').default;
const {GenerateSW} = require('workbox-webpack-plugin');
const cacheId = 'SKYNovel Gallery';

// 変更後は「npm run webpack:dev」
module.exports = [
	{
		entry: `./core/web4webpack.js`,
		target: 'web',
		output: {
			path: process.cwd() +'/docs',
			filename: 'web.js',
			chunkFilename: 'web.[name].js'
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					three: {test: /three/, name: 'three', chunks: 'initial'},
				}
			},
			minimize: true,
		},
		plugins: [
			new ImageminPlugin({
				disable: process.env.NODE_ENV !== 'production',
				test: /\.(jpe?g|png|gif|svg)$/i,
				pngquant: {quality: '95-100',},
			}),
			new GenerateSW({
				cacheId: cacheId,
				swDest:  process.cwd() +'/docs/sw.js',
				clientsClaim: true,
				skipWaiting: true,
				offlineGoogleAnalytics: false,
				directoryIndex: '/',
				cleanupOutdatedCaches: true,
			}),
		],
	}
];
