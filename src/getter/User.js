// 获取用户信息
export function getUserInfo(doc) {
	const { _id, username, age, sex, realname, phone } = doc
	return {
		id: _id,
		username,
		age,
		sex,
		realname,
		phone,
	}
}
