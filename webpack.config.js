const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development',

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
}

// 生产环境打包配置
const releaseconfig = {
	mode: 'production',
	devtool: '',
	entry: {
		app: './index.js',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: './dist',
		filename: 'src/js/[name].js?[hash]',
	},
	node: {
		__filename: "mock",
		__dirname: "mock",
		console: true,
		global: true,
		process: true,
		Buffer: true,
		setImmediate: true,
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
}

const config = Object.assign(defaultconfig, releaseconfig)

module.exports = config
