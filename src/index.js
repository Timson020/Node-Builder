import Express from 'express'

import { Utils, Constants } from './common'
import config from './config'

export default class App {
	constructor() {
		this.startServer()
	}

	startServer() {
		this.app = new Express()
		this.app.listen(config.port)
		console.info(`server is on, port is ${config.port}`)
	}
}
