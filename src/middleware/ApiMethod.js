import moment from 'moment'

import { Constants, Logger } from '../common'

function apiMethod(data = '', code) {
	this.t_log.info(`${Constants.serverMiddleWare}time = ${this.t_dateFormat()}, during = ${new Date() - this.t_time}ms`)
	const result = code === 200 ? data : { message: data, code }
	this.status(code).json(result).end()
}

export default function ApiMethod (req, res, next) {
	res.t_log = Logger
	res.t_time = new Date()
	res.t_dateFormat = () => moment().format('YYYY-MM-DD HH:mm:ss')
	res.api = apiMethod.bind(res)
	next()
}
