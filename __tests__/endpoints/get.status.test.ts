import * as supertest from 'supertest'
import { startServer } from '../../src/backend/server'
import { config } from '../../src/backend/config'
import { Server } from 'http'

describe('Endpoint status', () => {
    let server: Server
    // eslint-disable-next-line
    const request: any = supertest

    beforeAll(async () => {
        server = await startServer(config.server)
    })

    afterAll(async () => {
        await server.close()
    })

    it('POST /api/status should return 200', async () => {
        const response = await request.default(server).get('/api/status')

        expect(response.status).toBe(200)
        expect(response.text).toBe("I'm alive!")
    })
})
