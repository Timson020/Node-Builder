import Express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

// import { Utils, Constants } from './common'
import { Logs, Auth, ApiMethod } from './middleware'
import api from './api'
import config from './config'
// import dbConnect from './model'

export default class App {
	// 构建函数
	constructor() {
		this.startServer()
	}

	// 开启服务
	startServer() {
		this.app = new Express()
		// dbConnect()
		this.app.set('views', path.join(__dirname, '../views'))
		this.app.set('view engine', 'ejs')
		this.setStatic()
		this.setMiddleware()
		this.setApi()
		this.setApiError()
		this.setPageError()
		this.app.listen(config.port)
		console.info(`server is on, port is ${config.port}`)
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
		this.app.use(Express.static(path.resolve(__dirname, '../static')))
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
}
