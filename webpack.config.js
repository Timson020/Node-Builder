const path = require('path')
const webpack = require('webpack')
// const _externals = require('externals-dependencies')

const isDev = process.env.NODE_ENV === 'development'

const config = {
	name: "server",
	target: 'node',
	mode: 'production',
	devtool: '#eval-source-map',
	entry: {
		app: ['babel-polyfill', './index.js'],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: './dist',
		filename: '[name].js?[hash]',
	},
	resolve: {
		extensions: ['.js', '.json'],
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: 'babel-loader',
			exclude: /node_modules/,
		}],
	},
	plugins: [
		// 插件中的全局变量 -- 4.x 可以弃用
		// new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
		// loder里面的配置 -- 4.x 可以弃用
		// new webpack.LoaderOptionsPlugin({ minimize: true }),
	],
	performance: {
		hints: false,
	},
	node: {
		__filename: true,
		__dirname: true,
		console: true,
		global: true,
		process: true,
		Buffer: true,
		setImmediate: true,
		path: true
	},
	stats: {
		cached: true,
		cachedAssets: false,
		chunks: false,
		chunkModules: false,
		colors: true,
		hash: true,
		modules: false,
		reasons: true,
		timings: true,
		version: true,
	},
}

module.exports = config
