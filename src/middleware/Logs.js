import moment from 'moment'

import { Constants, Logger } from '../common'

const dateFormat = () => moment().format('YYYY-MM-DD HH:mm:ss')

export default function log(req, res, next) {
	const t = new Date()
	Logger.info(`${Constants.serverStart}time = ${dateFormat()}, method = ${req.method}, url = ${req.url}, ip = ${req.ip}, body = ${req.body}`)
	res.on('finish', () => {
		const duration = new Date() - t
		const code = res.statusCode.toString()
		Logger[code.substr(0, 1) <= 3 ? 'info' : 'error'](`${Constants.serverEnd}time = ${dateFormat()}, statusCode = ${res.statusCode}, duration = ${duration}ms`)
	})
	next()
}
