import redis from 'redis'
import config from '../config'

// 如果使用rediss连接的话，作为协议将启用TLS套接字连接，还需要在选项中传递其他TLS选项。
// 即tls字段不能为空
const redisClient = redis.createClient(`redis://${config.redishost}`, {
	port: config.redisport,
	password: config.redisauth,
	connect_timeout: 30000,
	tls: null,
})

redisClient.on('ready', function () { console.info('redis is success connect !') })

redisClient.on('error', function (err) { console.info(`redis is error connect ! err msg: ${err.toString()}`) })

export default redisClient
