const apis = {}

apis.getuserinfo = function (req, res, next) {
	try {
		res.api({ code: 1, msg: '', data: { username: 'timson', age: 20, sex: 2 } }, 200)
	} catch (err) {
		next()
	}
}

apis.updateuserinfo = function (req, res, next) {
	const { username, age, sex } = req.body
	try {
		res.api({ code: 1, msg: '', data: { username: username || 'timson', age: age || 20, sex: sex || 2 } }, 200)
	} catch (err) {
		next()
	}
	
}

apis.deluserinfo = function (req, res, next) {
	try {
		res.api({ code: 1, msg: 'delte user success', data: {} }, 200)
	} catch (err) {
		next()
	}
}

export default apis
