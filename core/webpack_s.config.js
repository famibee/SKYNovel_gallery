const {default: ImageminPlugin} = require('imagemin-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');
const cacheId = 'SKYNovel Simple Novel';

// 変更後は「npm run webpack:dev」
module.exports = [
	{
		entry: `./core/web4webpack_s.js`,
		target: 'web',
		output: {
			path: process.cwd() +'/docs',
			filename: 'web_s.js',
			chunkFilename: 'web_s.[name].js'
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
				swDest:  'sw_s.js',
				globDirectory: process.cwd() +'/docs',
				globPatterns: ['index_sn.html','icons/*.{jpg,png}','prj/simple_novel/**/*.*'],
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
