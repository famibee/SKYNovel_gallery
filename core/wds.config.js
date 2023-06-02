module.exports = {
	entry: `./core/web4webpack.js`,
	target: 'web',
	mode: 'development',
	output: {
		path: process.cwd() +'/docs',
		filename: 'prj/web.js',
	},
	resolve: {extensions: ['.ts', '...'],},
	module: {rules: [
		{test: /\.d\.ts|\.(map|txt)$/, loader: 'ignore-loader',},
		{test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules|\.d\.ts$/,},
	],},
	cache: {
		type: 'filesystem',
		buildDependencies: { config: [__filename], },
	},

	devServer: {
		static: {directory: './docs'},
		client: {logging: 'warn',},
//		open: 'index.html?cur=line_breaking_rules',
//		open: 'index.html?cur=sound',
		open: 'index.html',			// PCリッチ版（Githubにはこちらで更新）
//		open: 'prj/index_app.html',	// PWA
		port: 8082,
		watchFiles: ['prj/**/*','prj/web.skynovel.js'],
	},
};
