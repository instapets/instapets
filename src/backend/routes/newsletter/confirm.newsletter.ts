import { Request, Response } from 'express'

import { TRoute } from '../types'
import { prisma } from '../../database'
import { query, validationResult } from 'express-validator'
import { checkPrismaError } from '../../utils/prisma.utils'

export default {
    method: 'get',
    path: '/api/newsletter/confirm',
    validators: [query('code').not().isEmpty().withMessage('Code is empty.')],
    handler: async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        if (typeof req.query.code === 'string') {
            // Pobranie id najpierw bo prisma nie daje rady robić update na kolumnach użytych w where
            const newsletterRow = await prisma.newsletter.findFirst({
                where: {
                    code: req.query.code,
                },
            })

            if (newsletterRow === null) {
                return res.status(404).json('Newsletter row not found')
            }

            try {
                await prisma.newsletter.update({
                    where: {
                        id: newsletterRow.id,
                    },
                    data: {
                        code: null,
                        active: true,
                    },
                })
            } catch (error) {
                const responseStatus = checkPrismaError(error)
                return res
                    .status(responseStatus.status)
                    .json(responseStatus.message)
            }
        }

        res.status(200).json({ message: 'Ok' })
    },
} as TRoute
