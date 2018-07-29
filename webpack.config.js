const path = require('path')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

// 默认配置
const defaultconfig = {
	target: 'node',
	devtool: '#eval-source-map',
	resolve: {
		extensions: ['.js', '.json'],
		alias: {
			'@': path.resolve(__dirname, './src')
		}
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

// 生产环境打包配置
const releaseconfig = {
	name: "server",
	mode: 'production',
	devtool: '',
	entry: {
		app: ['babel-polyfill', './index.js'],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: './dist',
		filename: '[name].js?[hash]',
	},
	node: {
		__dirname: false,
		console: true,
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
		}],
	},
	plugins: [
		// 插件中的全局变量
		new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
		// loder里面的配置
		new webpack.LoaderOptionsPlugin({ minimize: true }),
	],
	performance: {
		hints: false,
	},
}

const config = Object.assign(defaultconfig, releaseconfig)

module.exports = config
