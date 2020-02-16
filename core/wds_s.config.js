module.exports = {
	entry: `./core/web4webpack_s.js`,
	target: 'web',
	mode: 'development',
	output: {
		path: process.cwd() +'/docs',
		filename: 'web_s.js',
	},

	devServer: {
		contentBase: './docs',
		port: 8082,
		openPage: 'index_sn.html',
		watchContentBase: true,
		open: true,
	},
};
