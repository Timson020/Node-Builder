import moment from 'moment'

import { Constants, Logger } from '../common'

// 返回方法
function apiMethod(data = '', code) {
	this.t_log.info(`${Constants.serverMiddleWare}time = ${this.t_dateFormat()}, during = ${new Date() - this.t_time}ms`)
	const result = code === 200 ? data : { message: data, code }
	this.status(code).json(result).end()
}

export default function ApiMethod (req, res, next) {
	// 打印方法部署到respond里
	res.t_log = Logger

	// 接受到的请求时间部署到respond里
	res.t_time = new Date()

	// 格式化时间方法部署到respond里
	res.t_dateFormat = () => moment().format('YYYY-MM-DD HH:mm:ss')
	
	// 统一返回数据方法
	res.api = apiMethod.bind(res)
	
	// 放行
	next()
}
