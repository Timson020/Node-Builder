import { Constants } from '../common'

export default function auth(req, res, next) {
	const { headers } = req
	const isVersion = !headers.version || (headers.version && Constants.version != headers.version)
	
	// 非api拦截通过
	if (!req.url.includes('api')) return next()
	
	// 打印header部分
	res.t_log.info(`${Constants.serverMiddleWare}time = ${res.t_dateFormat()}, header = ${JSON.stringify(headers)}`)
	
	// 版本号是否一致
	if (isVersion) return res.api({ code: 400, msg: '认证失败', data: '' }, 200)
	// 放行
	next()
}
