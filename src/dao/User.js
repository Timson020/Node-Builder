import UserSchema from '../model/User'

// 
export function findAllUsers() {
	return new Promise(res => {
		try {
			UserSchema.find({}, {}, (err, doc) => {
				if (err) return res({ code: 2, msg: err.toString(), data: [] })
				res({ code: 1, msg: '', data: doc })
			})
		} catch (err) {
			res({ code: 2, msg: err.toString(), data: [] })
		}
	})
}

// 
export function addUser(obj) {
	return new Promise(res => {
		try {
			const user = new UserSchema(obj)
			user.save((err, doc) => {
				if (err) return res({ code: 2, msg: err.toString(), data: { } })
				res({ code: 1, msg: '', data: doc })
			})
		} catch (err) {
			res({ code: 2, msg: err.toString(), data: { } })
		}
	})
}

// 
export function getUserinfo(id) {
	return new Promise(res => {
		try {
			UserSchema.findOne({ _id: id }, {}).exec((err, doc) => {
				if (err) return res({ code: 2, msg: err.toString(), data: { } })
				res({ code: 1, msg: '', data: doc })
			})
		} catch (err) {
			res({ code: 2, msg: err.toString(), data: { } })
		}
	})
}

// 
export function updateUser(id, obj) {
	return new Promise(res => {
		try {
			UserSchema.findByIdAndUpdate(id, { $set: { update_at: Date(), ...obj } }, (err, predoc) => {
				if (err) res({ code: 2, msg: err.toString(), data: {} })
				else res({ code: 1, msg: '', data: predoc })
			})
		} catch (err) {
			res({ code: 2, msg: err.toString(), data: {} })
		}
	})
}

// 
export function delUser(id) {
	return new Promise(res => {
		try {
			UserSchema.findByIdAndRemove(id, err => {
				if (err) res({ code: 2, msg: err.toString(), data: {} })
				else res({ code: 1, msg: '删除成功', data: {} })
			})
		} catch (err) {
			res({ code: 2, msg: err.toString(), data: {} })
		}
	})
}
