module.exports = {
	entry: `./core/web4webpack.js`,
	target: 'web',
	mode: 'development',
	output: {
		path: process.cwd() +'/docs',
		filename: 'prj/web.js',
	},
	module: {rules: [
		{test: /\.d\.ts|\.(map|txt)$/, loader: 'ignore-loader',},
		{test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules|\.d\.ts$/,},
	],},

	devServer: {
		static: {directory: './docs'},
		client: {logging: 'warn',},
		open: 'index.html',			// PCリッチ版（Githubにはこちらで更新）
//		open: 'prj/index_app.html',	// PWA
		port: 8082,
	},
};
