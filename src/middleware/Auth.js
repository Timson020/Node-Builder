import { Constants } from '../common'

const apiAuth = /\/api\//ig

export default function auth(req, res, next) {
	const { headers } = req
	
	// 非api拦截通过
	if (!apiAuth.test(req.url)) return next()
	
	// 打印header部分
	res.t_log.info(`${Constants.serverMiddleWare}time = ${res.t_dateFormat()}, header = ${JSON.stringify(headers)}`)
	
	// 版本号是否一致
	if (!headers.version || Constants.version != headers.version) return res.api({ code: 400, msg: '认证失败', data: '' }, 200)

	// 放行
	next()
}
