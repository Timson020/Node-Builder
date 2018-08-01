import ActionsSchema from '../model/Actions'
import { Constants } from '../common'

export default function log(req, res, next) {
	const { ip, url, method, headers, params, body: bodys } = req

	const header = JSON.stringify(headers)

	const body = JSON.stringify(bodys)

	const params = JSON.stringify(params)

	const action = new ActionsSchema({ ip, url, method, header, body })
	
	action.save((err) => {
		if (err) return res.t_log.error(`${Constants.serverMiddleWare}time = ${res.t_dateFormat()}, statusCode = 500, errMsg = ${err.toString()}`)
	})
	// 打印 请求最开始的日志
	res.t_log.info(`${Constants.serverStart}time = ${res.t_dateFormat()}, ip = ${ip}, url = ${url}, method = ${method}, params = ${params}, body = ${body}`)

	// respond结束的监听事件
	res.on('finish', () => {
		const duration = new Date() - res.t_time
		const code = res.statusCode.toString()
		
		// 打印 请求最后的日志
		res.t_log[code.substr(0, 1) <= 3 ? 'info' : 'error'](`${Constants.serverEnd}time = ${res.t_dateFormat()}, statusCode = ${res.statusCode}, duration = ${duration}ms`)
	})

	// 放行
	next()
}
