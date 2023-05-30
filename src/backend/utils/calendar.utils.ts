import { prisma } from '../database'

export const getEventsList = async () => {
    return prisma.calendar.findMany({
        orderBy: {
            dateStart: 'desc',
        },
    })
}

export const getEventsRangeList = async (dateStart?: Date, dateEnd?: Date) => {
    if (dateStart !== undefined) {
        dateStart.setHours(0, 0, 0, 10)
    }

    if (dateEnd !== undefined) {
        dateEnd.setHours(23, 59, 59, 999)
    }

    return prisma.calendar.findMany({
        where: {
            OR: [
                {
                    AND: [{ dateStart: { lte: dateStart } }, { dateEnd: { gte: dateStart } }],
                },
                {
                    AND: [{ dateStart: { lte: dateEnd } }, { dateEnd: { gte: dateEnd } }],
                },
                {
                    AND: [{ dateStart: { gte: dateStart } }, { dateEnd: { lte: dateEnd } }],
                },
            ],
        },
        orderBy: {
            dateStart: 'desc',
        },
    })
}

export const getEventsOfDayList = async (date: Date) => {
    return getEventsRangeList(new Date(date), new Date(date))
}
