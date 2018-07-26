import UserSchema from '../model/User'
import { User } from '../getter'

const apis = {}

apis.findalluser = function (req, res) {
	try {
		UserSchema.find({}, {}, (err, doc) => {
			if (err) return res.api({ code: 2, msg: err.toString(), data: [] }, 200)
			res.api({ code: 1, msg: '', data: doc }, 200)
		})
	} catch (err) {
		res.api(err.toString(), 500)
	}
}

apis.adduser = function (req, res) {
	const { username, age, sex } = req.body
	try {
		const user = new UserSchema({ username, age, sex })
		user.save((err, doc) => {
			if (err) return res.api({ code: 2, msg: err.toString(), data: { } }, 200)
			res.api({ code: 1, msg: '', data: User.getuserinfo(doc) }, 200)
		})
	} catch (err) {
		res.api(err.toString(), 500)
	}
}

apis.getuserinfo = function (req, res) {
	const { id } = req.params
	try {
		UserSchema.findOne({ _id: id }, {}).exec((err, doc) => {
			if (err) return res.api({ code: 2, msg: err.toString(), data: { } }, 200)
			res.api({ code: 1, msg: '', data: User.getuserinfo(doc) }, 200)
		})
	} catch (err) {
		res.api(err.toString(), 500)
	}
}

apis.updateuserinfo = function (req, res) {
	const { id } = req.params
	try {
		UserSchema.findByIdAndUpdate(id, { $set: { update_at: Date(), ...req.body } }, (err, predoc) => {
			if (err) res.api({ code: 2, msg: err.toString(), data: {} }, 200)
			else res.api({ code: 1, msg: '', data: User.getuserinfo(Object.assign(predoc, req.body)), }, 200)
		})
	} catch (err) {
		res.api(err.toString(), 500)
	}
}

apis.deluserinfo = function (req, res) {
	const { id } = req.params
	try {
		UserSchema.findByIdAndRemove(id, err => {
			if (err) res.api({ code: 2, msg: err.toString(), data: {} }, 200)
			else res.api({ code: 1, msg: '删除成功', data: {} }, 200)
		})
	} catch (err) {
		res.api(err.toString(), 500)
	}
}

export default apis
