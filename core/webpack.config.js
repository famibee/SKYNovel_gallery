const {default: ImageminPlugin} = require('imagemin-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');
const cacheId = 'SKYNovel Gallery';

// 変更後は「npm run webpack:dev」
module.exports = [
	{
		entry: `./core/web4webpack.js`,
		target: 'web',
		output: {
			path: process.cwd() +'/docs',
			filename: 'prj/web.js',
			chunkFilename: 'prj/web.[name].js'
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					three: {test: /node_modules\/three/, name: 'three', chunks: 'initial'},
					vendor: {test: /node_modules\/([^t]+|t[^h]+|thr[^e]+)/, name: 'vendor', chunks: 'initial'},
				},
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
				swDest:  'sw.js',
				globDirectory: process.cwd() +'/docs',
				globPatterns: ['favicon.ico','index.html','og_snapshot.jpg','prj/**/*.*'],
				globIgnores: ['prj/*.js'],
				maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,	// MB
				clientsClaim: true,
				skipWaiting: true,
				offlineGoogleAnalytics: false,
				directoryIndex: '/',
			}),
		],
		performance: {
			maxEntrypointSize: 2000 *1000,
			maxAssetSize: 1000 *1000
		},
	}
];
