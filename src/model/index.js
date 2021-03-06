import mongoose from 'mongoose'

import config from '../config'

const db = mongoose.connect(`${config.dbhost}:${config.dbport}/${config.dbname}`, {
	user: config.dbuser,
	pass: config.dbauth,
	useNewUrlParser: true,
	poolSize: 20, // 一般都是多少个Schema就设置多少给连接池
	keepAlive: true,
	keepAliveInitialDelay: 300000,
}).then(mongoConnectSuccess).catch(mongoConnectErr)

function mongoConnectSuccess() {
	console.info('mongodb connect is Success !')
}

function mongoConnectErr() {
	console.info('mongodb connect is Error !')
}

export default db
