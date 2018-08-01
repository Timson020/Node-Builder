import mongoose from 'mongoose'
import db from './index'
db

const Schema = new mongoose.Schema({
	ip: { type: String, default: '' }, // request from ip
	url: { type: String, default: '' }, // action-url
	method: { type: String, default: '' }, // 方法
	header: { type: String, default: '' }, // url-header
	body: { type: String, default: '' }, // 内容
	create_at: { type: Date, default: Date() }, // 创建时间
})

export default mongoose.model('Action', Schema)
