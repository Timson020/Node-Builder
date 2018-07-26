import mongoose from 'mongoose'
import db from './index'
db

const Schema = new mongoose.Schema({
	username: { type: String, unique: true }, // 昵称 || 用户名
	age: { type: Number, default: 0 }, // 年龄
	sex: { type: Number, default: 0 }, // 性别
	password: { type: String }, // 用户密码
	realname: { type: String, default: '' }, // 真是姓名
	phone: { type: Number, default: 0 }, // 手机号码
	create_at: { type: Date, default: Date() }, // 创建时间
	create_by: { type: String },
	update_at: { type: Date, default: Date() }, // 更新时间
	update_by: { type: String },
})

export default mongoose.model('User', Schema)
