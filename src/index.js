import Express from 'express'
import bodyParser from 'body-parser'

// import { Utils, Constants } from './common'
import { Logs, Auth, ApiMethod } from './middleware'
import config from './config'

export default class App {
	constructor() {
		this.startServer()
	}

	// 开启服务
	startServer() {
		this.app = new Express()
		this.setMiddleware()
		this.app.listen(config.port)
		console.info(`server is on, port is ${config.port}`)
	}

	// 设置服务中间件
	setMiddleware() {
		this.setStatic()
		this.app.use(bodyParser.urlencoded({ extended: true }))
		this.app.use(bodyParser.json())
		this.app.use(ApiMethod)
		this.app.use(Logs)
		this.app.use(Auth)
		this.app.use('/api/*', (req, res) => {
			return res.api({ code: 99, msg: '暂无此服务', data: '' }, 200)
		})
	}

	// 部署服务静态资源文件路径
	setStatic() {
		this.app.use(Express.static(__dirname + '../static'))
	}
}
