/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
if (process.env.NODE_ENV === 'production') {
	module.exports = {
		plugins: [
			require('autoprefixer'),
			require('cssnano'),
			// More postCSS modules here if needed
		],
	};
}
