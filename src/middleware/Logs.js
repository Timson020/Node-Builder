import { Constants } from '../common'

export default function log(req, res, next) {
	// 打印 请求最开始的日志
	res.t_log.info(`${Constants.serverStart}time = ${res.t_dateFormat()}, method = ${req.method}, url = ${req.url}, ip = ${req.ip}, body = ${JSON.stringify(req.body)}`)

	// respond结束的监听事件
	res.on('finish', () => {
		const duration = new Date() - res.t_time
		const code = res.statusCode.toString()
		
		// 打印 请求最后的日志
		res.t_log[code.substr(0, 1) <= 3 ? 'info' : 'error'](`${Constants.serverEnd}time = ${res.t_dateFormat()}, statusCode = ${res.statusCode}, duration = ${duration}ms`)
	})
	next()
}
