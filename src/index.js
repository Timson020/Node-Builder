import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { Constants } from './common'
import { Logs, Auth, ApiMethod } from './middleware'
import api from './api'
import config from './config'
import { UserTasks } from './schedule'

export default class App {
	// 构建函数
	constructor() {
		this.startServer()
	}

	// 开启服务
	startServer() {
		this.app = express()

		if (Constants.isDev) this.setDev()

		// 指定视图所在的位置
		this.app.set('views', './views')
		// 注册模板引擎
		this.app.set('view engine', 'ejs')
		this.setStatic()
		this.setMiddleware()
		this.setApi()
		this.app.use(this.setView)
		this.setApiError()
		this.setPageError()
		this.setTasks()
		!Constants.isDev ? this.app.listen(config.port) : null
		console.info([
			'                            _ooOoo_  ',
			'                           o8888888o  ',
			'                           88" . "88  ',
			'                           (| -_- |)  ',
			'                            O\\ = /O  ',
			'                        ____/`---\'\\____  ',
			'                      .   \' \\\\| |// `.  ',
			'                       / \\\\||| : |||// \\  ',
			'                     / _||||| -:- |||||- \\  ',
			'                       | | \\\\\\ - /// | |  ',
			'                     | \\_| \'\'\\---/\'\' | |  ',
			'                      \\ .-\\__ `-` ___/-. /  ',
			'                   ___`. .\' /--.--\ `. . __  ',
			'                ."" \'< `.___\\_<|>_/___.\' >\'"".  ',
			'               | | : `- \\`.;`\\ _ /`;.`/ - ` : | |  ',
			'                 \\ \\ `-. \\_ __\\ /__ _/ .-` / /  ',
			'         ======`-.____`-.___\\_____/___.-`____.-\'======  ',
			'                            `=---=\'  ',
			'         .............................................  ',
			'                  佛祖保佑             永无BUG ',
			'          佛曰:  ',
			'                  写字楼里写字间，写字间里程序员；  ',
			'                  程序人员写程序，又拿程序换酒钱。  ',
			'                  酒醒只在网上坐，酒醉还来网下眠；  ',
			'                  酒醉酒醒日复日，网上网下年复年。  ',
			'                  但愿老死电脑间，不愿鞠躬老板前；  ',
			'                  奔驰宝马贵者趣，公交自行程序员。  ',
			'                  别人笑我忒疯癫，我笑自己命太贱；  ',
			'                  不见满街漂亮妹，哪个归得程序员？  ',
		].join('\n'))
		!Constants.isDev ? console.info(`isDev: ${Constants.isDev}, server is on, port is ${config.port}`) : null
	}

	// 设置服务中间件
	setMiddleware() {
		// cookie 解析器
		this.app.use(cookieParser())
		// body 解析器
		this.app.use(bodyParser.urlencoded({ extended: true }))
		this.app.use(bodyParser.json())
		// 自定义中间件
		this.app.use(ApiMethod)
		this.app.use(Logs)
		this.app.use(Auth)
	}

	// 设置API
	setApi() {
		this.app.use('/api', api)
	}

	// 部署服务静态资源文件路径
	setStatic() {
		this.app.use(express.static('./static'))
	}

	// 设置ejs页面
	setView(req, res, next) {
		// 首页判断
		if (/^\/$/ig.test(req.path)) {
			res.status(200)
			return res.render('index', { title: 'welcome to express', list: [{ name: 'title1', description: 'description1' }, { name: 'title2', description: 'description2' }, { name: 'title3', description: 'description3' }] })	
		}
		next()
	}

	// 设置API错误返回
	setApiError() {
		this.app.use('/api/*', (req, res) => {
			return res.api({ code: 99, msg: '暂无此服务', data: '' }, 200)
		})
	}

	// 设置错误路由返回页面
	setPageError() {
		this.app.use((req, res) => {
			res.status(404)
			res.render('404', { url: req.url })
		})
	}

	// 设置定时任务
	setTasks() {
		UserTasks.getuserinfo()
	}

	// 开发环境设置
	setDev() {
		// const webpack = require('webpack')
		// const webpackDevMiddleware = require('webpack-dev-middleware')
		// const webpackHotMiddleware = require('webpack-hot-middleware')
		// const http = require('http')
		// const reload = require('reload')

		// const webpackConfig = require('../config/webpack.development.config.js')

		// const compiler = webpack(webpackConfig)
		// const server = http.createServer(this.app)

		// this.app.use(webpackDevMiddleware(compiler, {
		// 	// public path should be the same with webpack config
		// 	publicPath: webpackConfig.output.publicPath,
		// 	noInfo: false,
		// 	stats: {
		// 		colors: true,
		// 	},
		// }))

		// this.app.use(webpackHotMiddleware(compiler))
		
		// reload(this.app)
		
		// server.listen(config.port, function () {
		// 	console.info(`App (dev) is now running on port ${config.port}`)
		// })
	}
}
