const path = require('path')
const plugin_externals = require('externals-dependencies')
const plugin_copywebpack = require('copy-webpack-plugin')

const config = {
	// 配置名称
	name: 'server',
	// 环境目标
	target: 'node',
	// 配置模式
	mode: 'production',
	// 开发工具
	devtool: '',
	// 入口文件
	entry: {
		app: ['./index.js'],
	},
	// 输出文件
	output: {
		path: path.resolve(__dirname, '../dist/js'),
		publicPath: '/dist',
		filename: '[name].js?[hash]',
	},
	// 解析
	resolve: {
		extensions: ['.js', '.json'],
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	// 模块
	module: {
		rules: [{
			test: /\.js$/,
			use: 'babel-loader',
			exclude: /node_modules/,
		}],
	},
	// 插件
	plugins: [
		// 复制静态内容
		new plugin_copywebpack([{ from : './static', to: '../static' }, { from : './views', to: '../views' }]),
		// 插件中的全局变量 -- 4.x 可以弃用
		// new webpack.DefinePlugin({ 'process.env': { NODE_ENV: 'production' } }),
		// loder里面的配置 -- 4.x 可以弃用
		// new webpack.LoaderOptionsPlugin({ minimize: true }),
	],
	// 性能
	performance: {
		hints: false,
	},
	// node
	node: {
		__filename: true,
		__dirname: true,
		console: true,
		global: true,
		process: true,
		Buffer: true,
		setImmediate: true,
		path: true,
	},
	// 外部拓展
	externals: plugin_externals(['dependencies', 'devDependencies']),
	// 统计信息
	stats: {
		// 添加资源信息
		assets: true,

		// 对资源按指定的字段进行排序
		// 你可以使用 `!field` 来反转排序。
		assetsSort: 'field',

		// 添加构建日期和构建时间信息
		builtAt: true,

		// 添加缓存（但未构建）模块的信息
		cached: true,

		// 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
		cachedAssets: true,

		// 添加 children 信息
		children: true,

		// 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
		chunks: true,

		// 将构建模块信息添加到 chunk 信息
		chunkModules: true,

		// 添加 chunk 和 chunk merge 来源的信息
		chunkOrigins: true,

		// 按指定的字段，对 chunk 进行排序
		// 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
		chunksSort: 'field',

		// 用于缩短 request 的上下文目录
		context: path.resolve(__dirname, './src'),

		// `webpack --colors` 等同于
		colors: true,

		// 显示每个模块到入口起点的距离(distance)
		depth: true,

		// 通过对应的 bundle 显示入口起点
		entrypoints: true,

		// 添加 --env information
		env: true,

		// 添加错误信息
		errors: true,

		// 添加错误的详细信息（就像解析日志一样）
		errorDetails: true,

		// 将资源显示在 stats 中的情况排除
		// 这可以通过 String, RegExp, 获取 assetName 的函数来实现
		// 并返回一个布尔值或如下所述的数组。
		excludeAssets: ['filter', /filter/],

		// 将模块显示在 stats 中的情况排除
		// 这可以通过 String, RegExp, 获取 moduleSource 的函数来实现
		// 并返回一个布尔值或如下所述的数组。
		excludeModules: ['filter', /filter/],

		// 和 excludeModules 相同
		exclude: ['filter', /filter/],

		// 添加 compilation 的哈希值
		hash: true,

		// 设置要显示的模块的最大数量
		maxModules: 15,

		// 添加构建模块信息
		modules: true,

		// 按指定的字段，对模块进行排序
		// 你可以使用 `!field` 来反转排序。默认是按照 `id` 排序。
		modulesSort: 'field',

		// 显示警告/错误的依赖和来源（从 webpack 2.5.0 开始）
		moduleTrace: true,

		// 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
		performance: true,

		// 显示模块的导出
		providedExports: true,

		// 添加 public path 的信息
		publicPath: true,

		// 添加模块被引入的原因
		reasons: true,

		// 添加模块的源码
		source: true,

		// 添加时间信息
		timings: true,

		// 显示哪个模块导出被用到
		usedExports: true,

		// 添加 webpack 版本信息
		version: true,

		// 添加警告
		warnings: true,

		// 过滤警告显示（从 webpack 2.4.0 开始），
		// 可以是 String, Regexp, 一个获取 warning 的函数
		// 并返回一个布尔值或上述组合的数组。第一个匹配到的为胜(First match wins.)。
		warningsFilter: ['filter', /filter/],
	},
}

module.exports = config
