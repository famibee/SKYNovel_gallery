module.exports = {
	entry: `./core/web4webpack.js`,
	target: 'web',
	mode: 'development',
	output: {
		path: process.cwd() +'/docs',
		filename: 'web.js',
	},

	devServer: {
		contentBase: './docs',
		port: 8082,
		openPage: 'index.html',
		watchContentBase: true,
		open: true,
		headers: {
			// 'Access-Control-Allow-Origin': '*'	//--いまのとこ不要
		},
	},
};
