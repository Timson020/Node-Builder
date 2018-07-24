import moment from 'moment'

import { Constants, Logger } from '../common'

const dateFormat = () => moment().format('YYYY-MM-DD HH:mm:ss')

function apiMethod(data = '', code) {
	if (this.api) console.info('has api')
	console.log('还没完成')
	Logger.info(`${Constants.serverMiddleWare}time = ${dateFormat()}, method = ${this.method}`)
	const result = code === 200 ? data : { message: data, code }
	this.status(code).json(result)
}

export default function ApiMethod (req, res, next) {
	res.api = apiMethod.bind(res)
	next()
}
