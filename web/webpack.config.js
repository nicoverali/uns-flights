// Webpack uses this to work with directories
const path = require('path');

// Use to export processed CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Creates an index.html with dependencies injected
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Main configuration object. Determines Webpack behavior
module.exports = {
	// Path to entry point. Webpack will begin here
	entry: './src/index.js',

	// Path and filename of result bundles
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},

	resolve: {
		// Simplifies path resolving in modules
		alias: {
			'@Assets': path.resolve(__dirname, 'src/assets/'),
			'@Components': path.resolve(__dirname, 'src/components/'),
			'@Pages': path.resolve(__dirname, 'src/pages/'),
			'@Services': path.resolve(__dirname, 'src/services'),
			'@Root': path.resolve(__dirname, 'src'),
		},
	},

	// After building keep watching for file's changes
	watch: true,
	watchOptions: {
		poll: true,
		ignored: /node_modules/,
	},

	// Add steps to bundling process
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-react',
								{
									plugins: ['@babel/plugin-proposal-class-properties', 'emotion'],
								},
							],
						},
					},
				],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				// Loaders are apply from bottom to top
				use: [
					{
						// After all CSS loaders, it gets all transformed CSS and extraxts
						// it into a separate single bundled file
						loader: MiniCssExtractPlugin.loader,
					},
					{
						// This loader resolves url() and @imports inside CSS
						loader: 'css-loader',
					},
					{
						// Then we apply postCSS fixes like autoprefixer and minifying
						loader: 'postcss-loader',
					},
					{
						// First we transform SASS to standard CSS
						loader: 'sass-loader',
						options: {
							implementation: require('sass'),
						},
					},
					{
						loader: 'sass-resources-loader',
						options: {
							resources: ['./src/vars.scss'],
						},
					},
				],
			},
			{
				// Loads images
				test: /\.(png|jpe?g|gif)$/,
				use: [
					{
						loader: 'file-loader',

						// In options we can set different things like format
						// and directory to save
						options: {
							outputPath: 'images',
						},
					},
				],
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			},
			{
				// Loads fonts
				test: /\.(woff|woff2|ttf|otf|eot)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts',
						},
					},
				],
			},
		],
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: 'bundle.css',
		}),
		new HtmlWebpackPlugin({
			template: `${__dirname}/src/index.html`,
		}),
	],

	mode: 'development',
};
