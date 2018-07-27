import RedisClient from '../redis'

const apis = {}

// 
apis.getcode = function (req, res) {
	try {
		res.api({ code: 1, msg: '发送成功', data: {} }, 200)
	} catch (err) {
		res.api(err.toString(), 500)
	}
}

// 
apis.setkeyredis = function (req, res) {
	const { value, key } = req.body
	try {
		RedisClient.set(key, value, (err, reply) => {
			if (err) return res.api({ code: 2, msg: err.toString(), data: {} }, 200)
			res.api({ code: 1, msg: reply, data: {} }, 200)
		})
	} catch (err) {
		res.api(err.toString(), 500)
	}
}

apis.settimeoutredis = function (req, res) {
	const { key, time } = req.body
	try {
		// time是用秒来计算的
		RedisClient.expire(key, time, function (err, reply) {
			if (err) return res.api({ code: 2, msg: err.toString(), data: {} }, 200)
			res.api({ code: 1, msg: reply, data: {} }, 200)
		})
	} catch (err) {
		res.api(err.toString(), 500)
	}
}

apis.getkeyredis = function (req, res) {
	const { key } = req.params
	try {
		RedisClient.get(key, (err, reply) => {
			if (err) return res.api({ code: 2, msg: err.toString(), data: {} }, 200)
			res.api({ code: 1, msg: '', data: reply }, 200)
		})	
	} catch (err) {
		res.api(err.toString(), 500)
	}
}

export default apis
