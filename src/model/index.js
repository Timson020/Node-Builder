import mongoose from 'mongoose'

import config from '../config'

// const db = mongoose.connect(`${config.dbhost}/${config.dbname}/${config.dbport}`, {
// 	useNewUrlParser: true,
// 	user: config.dbuser,
// 	pass: config.dbauth,
// })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
	console.info('we\'re connected!')
})

// const db = mongoose.createConnection(config.dbhost, config.dbname, config.dbport, {
// 	user: config.dbuser,
// 	pass: config.dbauth,
// })

// console.info(db)
// db.once('open', () => {
// 	console.info(`connect to ${config.db} success!`)
// })

export default db
