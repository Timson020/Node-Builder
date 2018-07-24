import { Constants } from '../common'

const versionAuth = /\/api\//ig

export default function auth(req, res, next) {
	const { headers: { version } } = req
	if (!versionAuth.test(req.url)) return next()
	if (!version || Constants.version != version) res.api('认证失败', 500)
}
