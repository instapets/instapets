import { Request, Response } from 'express'
import { TRoute } from '../types'
import { getEventsRangeList, getEventsList, getEventsOfDayList } from '../../utils/calendar.utils'
import { Calendar } from '@prisma/client'
import { body, validationResult } from 'express-validator'

export default {
    method: 'post',
    path: '/api/calendar/list',
    validators: [
        body('date').optional().notEmpty().isDate().withMessage('Field must be a valid date.'),
        body('date_start').optional().notEmpty().isDate().withMessage('Field must be a valid date.'),
        body('date_end').optional().notEmpty().isDate().withMessage('Field must be a valid date.'),

        body().custom((value, { req }) => {
            const dateStart = req.body.date_start
            const dateEnd = req.body.date_end

            if (dateStart && dateEnd) {
                return dateStart <= dateEnd
            }

            return true
        }),
    ],
    handler: async (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        let events: Calendar[] | undefined

        if (req.body.date) {
            events = await getEventsOfDayList(new Date(Date.parse(req.body.date)))
        } else if (req.body.date_start || req.body.date_end) {
            events = await getEventsRangeList(
                req.body.date_start ? new Date(Date.parse(req.body.date_start)) : undefined,
                req.body.date_end ? new Date(Date.parse(req.body.date_end)) : undefined,
            )
        } else {
            events = await getEventsList()
        }

        if (events && Object.keys(events).length === 0) {
            res.status(404).json({ message: 'Not found' })
            return
        }

        res.status(200).json(events)
    },
} as TRoute
