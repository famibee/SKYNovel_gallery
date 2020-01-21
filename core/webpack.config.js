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
				swDest:  'sw.js',
				globDirectory: process.cwd() +'/docs',
				globPatterns: ['*.html','{grp,icons,js_ace,plugin_lib}/*.{jpg,png,js,css}','web_cache/*.{css,js,map}','webfonts/*.{ttf,woff,woff2}','prj/**/*.*'],
				maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,	// MB
				clientsClaim: true,
				skipWaiting: true,
				offlineGoogleAnalytics: false,
				directoryIndex: '/',
			}),
		],
	}
];
