module.exports = {
	configureWebpack: {
		devtool: 'source-map',
		optimization: {
			minimize: true,
			nodeEnv: 'production',
		},
	},
	css: {
		extract: false,
		loaderOptions: {
			sass: {
				prependData: '@import "~@/assets/scss/variables.scss";',
			},
		},
	},
}
