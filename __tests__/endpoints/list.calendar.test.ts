import * as supertest from 'supertest'
import { startServer } from '../../src/backend/server'
import { config } from '../../src/backend/config'
import { Server } from 'http'

describe('Endpoint calendar', () => {
    let server: Server
    // eslint-disable-next-line
    const request: any = supertest

    beforeAll(async () => {
        server = await startServer(config.server)
    })

    afterAll(async () => {
        await server.close()
    })

    it('GET /api/calendar/list should return 404', async () => {
        const response = await request.default(server).get('/api/calendar/list')

        expect(response.status).toBe(404)
    })

    it('POST /api/calendar/list should return 200', async () => {
        const response = await request.default(server).post('/api/calendar/list').send({}).set('Content-Type', 'application/json')

        expect(response.status).toBe(200)
    })

    it('POST /api/calendar/list should return 200 on correct date', async () => {
        const response = await request.default(server).post('/api/calendar/list').send({ date: '2023-05-08' }).set('Content-Type', 'application/json')

        expect(response.status).toBe(200)
    })

    it('POST /api/calendar/list should return 404 on empty result list with date', async () => {
        const response = await request.default(server).post('/api/calendar/list').send({ date: '2000-05-08' }).set('Content-Type', 'application/json')

        expect(response.status).toBe(404)
    })

    it('POST /api/calendar/list should return 400 on wrong date', async () => {
        const response = await request.default(server).post('/api/calendar/list').send({ date: 'abc' }).set('Content-Type', 'application/json')

        expect(response.status).toBe(400)
    })

    it('POST /api/calendar/list should return 200 on correct date range', async () => {
        const response = await request.default(server).post('/api/calendar/list').send({ date_start: '2023-05-08', date_end: '2023-05-09' }).set('Content-Type', 'application/json')

        expect(response.status).toBe(200)
    })

    it('POST /api/calendar/list should return 200 on correct date range with empty start', async () => {
        const response = await request.default(server).post('/api/calendar/list').send({ date_end: '2023-05-09' }).set('Content-Type', 'application/json')

        expect(response.status).toBe(200)
    })

    it('POST /api/calendar/list should return 400 on invalid date end', async () => {
        const response = await request.default(server).post('/api/calendar/list').send({ date_end: 'abc' }).set('Content-Type', 'application/json')

        expect(response.status).toBe(400)
    })

    it('POST /api/calendar/list should return 200 on correct date range with empty end', async () => {
        const response = await request.default(server).post('/api/calendar/list').send({ date_start: '2023-05-09' }).set('Content-Type', 'application/json')

        expect(response.status).toBe(200)
    })

    it('POST /api/calendar/list should return 400 on invalid date start', async () => {
        const response = await request.default(server).post('/api/calendar/list').send({ date_start: 'abc' }).set('Content-Type', 'application/json')

        expect(response.status).toBe(400)
    })

    it('POST /api/calendar/list should return 400 on date start greater than date end', async () => {
        const response = await request.default(server).post('/api/calendar/list').send({ date_start: '2023-05-10', date_end: '2023-05-09' }).set('Content-Type', 'application/json')

        expect(response.status).toBe(400)
    })

    it('POST /api/calendar/list should return 404 on empty list', async () => {
        const response = await request.default(server).post('/api/calendar/list').send({ date_start: '2000-05-10', date_end: '2000-05-09' }).set('Content-Type', 'application/json')

        expect(response.status).toBe(400)
    })
})
