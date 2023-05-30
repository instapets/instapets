import { Request, Response } from 'express'

import { TRoute } from '../types'
import { sendEmail } from '../../utils/mail.utils'
import { body, validationResult } from 'express-validator'

export default {
    method: 'post',
    path: '/api/contact/send',
    validators: [
        body('name').not().isEmpty().withMessage('Name is empty.'),
        body('surname').not().isEmpty().withMessage('Surname is empty.'),
        body('email').not().isEmpty().withMessage('Email is empty.'),
        body('email').isEmail().withMessage('Wrong email format.'),
        body('message').not().isEmpty().withMessage('Message is empty.'),
    ],
    handler: async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // Wysłanie maila Uwaga z racji użycia SANDBOXA maile wysyłane są tylko na mail dev
        await sendEmail({
            recipient: [process.env.AWS_SES_SENDER_EMAIL_ADDRESS ? process.env.AWS_SES_SENDER_EMAIL_ADDRESS : ''],
            subject: 'Nowe zapytanie z formularza kontaktowego',
            message: `${req.body.name} ${req.body.surname} (${req.body.email}), ${req.body.message}`,
        })

        res.status(200).json({ message: 'Ok' })
    },
} as TRoute
