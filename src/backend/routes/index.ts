import express from 'express'

import getStatus from './status/get.status'
import postUser from './user/post.user'
import loginUser from './user/login.user'
import subscribeNewsletter from './newsletter/subscribe.newsletter'
import confirmNewsletter from './newsletter/confirm.newsletter'

const router = express.Router()

// home page route
router.get('/', (req, res) => {
    res.send('Example home page')
})

// api routes
const apiRoutes = [
    getStatus,
    postUser,
    loginUser,
    subscribeNewsletter,
    confirmNewsletter,
]

apiRoutes.forEach((route) =>
    router[route.method](route.path, route.validators, route.handler),
)

export default router