// 変更後は「npm run webpack:dev」
const {GenerateSW} = require('workbox-webpack-plugin');
const cacheId = 'SKYNovel Gallery';

module.exports = [{
	entry: `./core/web4webpack`,
	target: 'web',
	output: {
		path: process.cwd() +'/docs/prj',
		filename: 'web.[name].js',
		chunkFilename: 'web.[id].js',
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				three: {test: /node_modules\/three/, name: 'three', chunks: 'initial'},
				skynovel: {test: /node_modules\/@famibee\/skynovel/, name: 'skynovel', chunks: 'initial'},
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
		maxAssetSize: 1000 *1000,
	},
	resolve: {extensions: ['.ts', '.js'],},
	module: {rules: [
		{test: /\.d\.ts|\.(map|txt)$/, loader: 'ignore-loader',},
		{test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules|\.d\.ts$/,},
	],},
}];
