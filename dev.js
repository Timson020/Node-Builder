import express from 'express'
import reload from 'reload'

import App from './index'
import config from './src/config'

const exp = express()

const { app } = App

console.info(module.hot ? '✅	Server-side HMR Enabled!' : '❌	Server-side HMR Not Supported.')

module.hot.accept('./index', function() {
	console.info('🔁	HMR Reloading')
	reload(app)
})

export default exp.use((req, res) => app.handle(req, res)).listen(config.port, function(err) {
	if (err) return console.error(err)
	console.info('server is start')
})
