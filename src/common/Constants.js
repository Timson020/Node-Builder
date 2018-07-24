export default {
	// 版本号
	version: '1.0.0',

	// log-string
	serverStart: '----Start: ',
	serverMiddleWare: '----Middle: ',
	serverEnd: '----End: ',

	// 是否是开发环境
	isDev: process.env.NODE_ENV === 'development',
}
