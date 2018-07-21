import path from 'path'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import moment from 'moment'

import { Constants } from '../common'

const dateFormat = () => moment().format('YYYY-MM-DD HH:mm:ss')

const consoleTransport = new winston.transports.Console({
	level: 'info',
	exitOnError: true,
})

const allTransport = new DailyRotateFile({
	dirname: path.join(__dirname, '../logs'),
	filename: 'request-%DATE%.log',
	datePattern: 'YYYY-MM-DD HH-mm-ss',
	zippedArchive: false,
	maxSize: '1g',
	maxFiles: '1d',
})

const transports = [allTransport]

const format = winston.format.combine(winston.format.printf(info => `${info.level}: ${info.message}`))

if (Constants.isDev) transports.push(consoleTransport)

const Logger = winston.createLogger({
	level: 'info',
	transports,
	format,
})

export default function log(req, res, next) {
	const t = new Date()
	Logger.info(`---Started: time = ${dateFormat()}, method = ${req.method}, url = ${req.url}, ip = ${req.ip}, body = ${req.body}`)
	res.on('finish', () => {
		const duration = new Date() - t
		const code = res.statusCode.toString()
		Logger[code.substr(0, 1) <= 3 ? 'info' : 'error'](`---Completed: time = ${dateFormat()}, statusCode = ${res.statusCode}, duration = ${duration}ms`)
	})
	next()
}
