import express from 'express'

import App from './src/index'
// import config from './src/config'

const exp = express()

const app = new App()

console.info(module.hot ? '✅	Server-side HMR Enabled!' : '❌	Server-side HMR Not Supported.')

module.hot.accept('./src/index', function() {
	console.info('🔁	HMR Reloading')
})

export default exp.use((req, res) => app.app.handle(req, res)).listen(9000, function(err) {
	if (err) return console.error(err)
	console.info('server is start')
})
