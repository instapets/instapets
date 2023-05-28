import { Request, Response } from 'express'

import { TRoute } from '../types'
import { sendEmail } from '../../utils/mail.utils'
import { body, validationResult } from 'express-validator'
import { prisma } from '../../database'
import { verifyToken } from '../../utils/jwt.utils'
import { v4 } from 'uuid'

const SECRET = (process.env.SECRET_KEY as string) ?? 'XYZ'

export default {
    method: 'post',
    path: '/api/newsletter/subscribe',
    validators: [
        body('email').not().isEmpty().withMessage('Email is empty.'),
        body('email').isEmail().withMessage('Wrong email format.'),

        // Sprawdzenie, czy podany mail znajduje się bazie
        body('email').custom(async (email) => {
            const rowExist = await prisma.newsletter.findFirst({
                where: {
                    email: email,
                },
            })

            if (rowExist) {
                throw new Error('This email already exists.')
            }

            return true
        }),
    ],
    handler: async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const insert = {
            email: req.body.email,
            active: false,
            userId: null,
            code: '',
        }

        // Sprawdzenie, czy zalogowany, jeśli tak to zapisz id przy rekordzie - pozwalamy mieć użytkownika zapisanego do newsletera na kilku mailach
        if (req.headers.authorization) {
            const token = req.headers.authorization?.replace('Bearer ', '')
            if (token) {
                const tokenData = verifyToken(token, SECRET)
                if (tokenData.isValid) {
                    insert.userId = tokenData.content.id
                }
            }
        }

        // Wygenerowanie kodu aktywacji
        insert.code = btoa(v4())

        // Dodanie rekordu do bazy
        await prisma.newsletter.create({
            data: insert,
        })

        // Wysłanie maila Uwaga z racji użycia SANDBOXA maile wysyłane są tylko na mail dev
        await sendEmail({
            recipient: [insert.email],
            subject: 'Aktywuj newsletter Instapets',
            message:
                'Kliknij link, aby potwierdzić newsletter: <a href="http://localhost:3000/api/newsletter/confirm?code=' +
                insert.code +
                '">tutaj</a>',
        })

        res.status(200).json({ message: 'Ok' })
    },
} as TRoute
