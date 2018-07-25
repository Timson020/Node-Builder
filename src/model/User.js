import mongoose from 'mongoose'
import db from './'

const UserSchema = new mongoose.Schema({
	username: { type: String, unique: true }, // 用户名
	password: { type: String }, // 用户密码
	realname: { type: String }, // 真是姓名
	phone: { type: String }, // 手机号码
	create_at: { type: Date, default: Date() }, // 创建时间
	create_by: { type: String },
	update_at: { type: Date }, // 更新时间
	update_by: { type: String },
})

export default db.model('User', UserSchema, 'user')
