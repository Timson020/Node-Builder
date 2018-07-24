const apis = {}

apis.getcode = function (req, res, next) {
	try {
		res.api({ code: 1, msg: '发送成功', data: {} }, 200)
	} catch (err) {
		next()
	}
}

export default apis
