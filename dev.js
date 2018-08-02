import express from 'express'

import app from './index'
// import config from './src/config'

const exp = express()

console.info(module.hot ? '✅	Server-side HMR Enabled!' : '❌	Server-side HMR Not Supported.')

module.hot.accept('./index', function() {
	console.info('🔁	HMR Reloading')
})

export default exp.use((req, res) => app.handle(req, res)).listen(9000, function(err) {
	if (err) return console.error(err)
	console.info('server is start')
})
