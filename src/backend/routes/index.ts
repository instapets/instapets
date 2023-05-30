import express from 'express'

import getStatus from './status/get.status'
import postUser from './user/post.user'
import loginUser from './user/login.user'
import subscribeNewsletterRoute from './newsletter/subscribe.newsletter'
import confirmNewsletterRoute from './newsletter/confirm.newsletter'
import addRating from './rating/add.rating'
import contactRoute from './contact/send.contact'
import calendarRoute from './calendar/list.calendar'

const router = express.Router()

// home page route
router.get('/', (req, res) => {
    res.send('Example home page')
})

// api routes
const apiRoutes = [getStatus, postUser, loginUser, subscribeNewsletterRoute, confirmNewsletterRoute, addRating, contactRoute, calendarRoute]

apiRoutes.forEach((route) => router[route.method](route.path, route.validators, route.handler))

export default router
