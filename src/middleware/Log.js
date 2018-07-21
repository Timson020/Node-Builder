import path from 'path'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import moment from 'moment'

import { Constants } from '../common'

const dateFormat = () => moment().format('YYYY-MM-DD HH:mm:ss')

const consoleTransport = new winston.transports.Console({
	timestamp: dateFormat,
	colorize: true,
})

const allTransport = new DailyRotateFile({
	name: 'all',
	filename: path.join(__dirname, '../logs/request.log'),
	datePattern: 'yyyy-MM-dd-',
	prepend: true,
	level: 'info',
	timestamp: dateFormat,
	handleExceptions: true,
	humanReadableUnhandledException: true,
	json: false,
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
	Logger.info(`---Started: ${req.method}, ${req.url}, ${req.ip}, ${req.body}`)
	next()
}
