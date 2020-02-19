module.exports = {
	entry: `./core/web4webpack.js`,
	target: 'web',
	mode: 'development',
	output: {
		path: process.cwd() +'/docs',
		filename: 'prj/web.js',
	},

	devServer: {
		contentBase: './docs',
		port: 8082,
		openPage: 'index.html',			// PCリッチ版
	//	openPage: 'prj/index_app.html',	// PWA
		watchContentBase: true,
		open: true,
	},
};
