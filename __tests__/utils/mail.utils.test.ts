import { sendEmail } from '../../src/backend/utils/mail.utils'
import 'dotenv/config'

describe('sendEmail', () => {
    it('should access environment variables', () => {
        const email = process.env.AWS_SES_SENDER_EMAIL_ADDRESS

        expect(email).not.toBe(undefined)
    })

    it('should send an email', async () => {
        const email = process.env.AWS_SES_SENDER_EMAIL_ADDRESS ? process.env.AWS_SES_SENDER_EMAIL_ADDRESS : ''

        const data = {
            recipient: [email],
            subject: 'Test Subject',
            message: 'Test Message',
        }

        const result = await sendEmail(data)

        expect(result).toBe(true)
    })

    it('should return false on error', async () => {
        const data = {
            recipient: [],
            subject: 'Test Subject',
            message: 'Test Message',
        }

        const result = await sendEmail(data)

        expect(result).toBe(false)
    })
})
