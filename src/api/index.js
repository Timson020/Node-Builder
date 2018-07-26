import express from 'express'

import User from './User'
import Common from './Common'

const router = express.Router()

// user
router.get('/users', User.findalluser)
router.post('/user', User.adduser)
router.get('/user/:id', User.getuserinfo)
router.put('/user/:id', User.updateuserinfo)
router.delete('/user/:id', User.deluserinfo)

// common
router.post('/common/getcode', Common.getcode)

export default router
