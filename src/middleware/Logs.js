import { Constants } from '../common'

export default function log(req, res, next) {
	res.t_log.info(`${Constants.serverStart}time = ${res.t_dateFormat()}, method = ${req.method}, url = ${req.url}, ip = ${req.ip}, body = ${JSON.stringify(req.body)}`)
	
	res.on('finish', () => {
		const duration = new Date() - res.t_time
		const code = res.statusCode.toString()
		res.t_log[code.substr(0, 1) <= 3 ? 'info' : 'error'](`${Constants.serverEnd}time = ${res.t_dateFormat()}, statusCode = ${res.statusCode}, duration = ${duration}ms`)
	})
	next()
}
