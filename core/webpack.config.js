const {GenerateSW} = require('workbox-webpack-plugin');
const cacheId = 'SKYNovel Gallery';

// 変更後は「npm run webpack:dev」
module.exports = [{
	entry: `./core/web4webpack.js`,
	target: 'web',
	mode: 'development',
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
	},
	plugins: [
		new GenerateSW({
			cacheId: cacheId,
			swDest: 'sw.js',
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
	resolve: {extensions: ['.ts', '.js'],},
	module: {rules: [{test: /\.ts$/, loader: 'ts-loader'},],},
}];
