const {merge} = require('webpack-merge');
const core = require('./webpack-core.config');

watchConfig = {
	// After building keep watching for file's changes
	watch: true,
	watchOptions: {
		poll: true,
		ignored: /node_modules/,
	}
}

module.exports = merge(core, watchConfig);