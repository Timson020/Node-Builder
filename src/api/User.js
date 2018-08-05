import { userdao } from '../dao'
import { usergetter } from '../getter'

const apis = {}

// 
apis.findalluser = async function (req, resp) {
	try {
		const res = await userdao.findAllUsers()
		resp.api(res, 200)
	} catch (err) {
		resp.api(err.toString(), 500)
	}
}

// 
apis.adduser = async function (req, resp) {
	const { username, age, sex } = req.body
	try {
		const res = await userdao.addUser({ username, age, sex })
		if (res.code == 1) res.data = usergetter.getUserInfo(res.data)
		resp.api(res, 200)
	} catch (err) {
		resp.api(err.toString(), 500)
	}
}

// 
apis.getuserinfo = async function (req, resp) {
	const { id } = req.params
	try {
		const res = await userdao.getUserinfo(id)
		if (res.code == 1) res.data = usergetter.getUserInfo(res.data)
		resp.api(res, 200)
	} catch (err) {
		resp.api(err.toString(), 500)
	}
}

// 
apis.updateuserinfo = async function (req, resp) {
	const { id } = req.params
	try {
		const res = await userdao.updateUser(id, res.body)
		if (res.code == 1) res.data = usergetter.getUserInfo(Object.assign(res.data, req.body))
		resp.api(res, 200)
	} catch (err) {
		resp.api(err.toString(), 500)
	}
}

// 
apis.deluserinfo = async function (req, resp) {
	const { id } = req.params
	try {
		const res = await userdao.delUser(id)
		resp.api(res, 200)
	} catch (err) {
		resp.api(err.toString(), 500)
	}
}

export default apis
