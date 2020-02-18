module.exports = {
	entry: `./core/web4webpack_s.js`,
	target: 'web',
	mode: 'development',
	output: {
		path: process.cwd() +'/docs',
		filename: 'pwa_mono/web.js',
	},

	devServer: {
		contentBase: './docs',
		port: 8083,
		openPage: 'pwa_mono/index.html',
		watchContentBase: true,
		open: true,
	},
};
