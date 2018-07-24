import path from 'path'
import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

import Constants from './Constants'

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

export default Logger
