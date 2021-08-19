module.exports = {
	entry: `./core/web4webpack_s.js`,
	target: 'web',
	mode: 'development',
	output: {
		path: process.cwd() +'/docs',
		filename: 'pwa_mono/web.js',
	},

	devServer: {
		static: {directory: './docs'},
		open: 'pwa_mono/index.html',
		port: 8083,
	},
};
