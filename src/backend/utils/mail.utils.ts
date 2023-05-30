import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import { fromEnv } from '@aws-sdk/credential-providers'

export type TSendEmailObject = {
    recipient: Array<string>
    subject: string
    message: string
}

export async function sendEmail(data: TSendEmailObject) {
    const sesClient = new SESClient({
        credentials: fromEnv(),
        region: process.env.AWS_SES_REGION,
    })

    if (Object.keys(data.recipient).length === 0 || !data.subject || !data.message) {
        return false
    }

    /*
     Jeśli podano emial to zastąp go, mail celowo jest zastępowywany na maila z ENV,
     z uwagi na to AMAZON SES w wersji SANDBOX zezwala na wysyłanie maili
     tylko do zdefiniowanej i zweryfikowanej listy maili
    */
    if (data.recipient) {
        data.recipient = []
        data.recipient[0] = process.env.AWS_SES_SENDER_EMAIL_ADDRESS ? process.env.AWS_SES_SENDER_EMAIL_ADDRESS.toString() : ''
    }

    const params = {
        Source: process.env.AWS_SES_SENDER_EMAIL_ADDRESS,
        Destination: {
            ToAddresses: data.recipient,
        },
        Message: {
            Subject: {
                Data: data.subject,
            },
            Body: {
                Text: {
                    Data: data.message,
                },
            },
        },
    }

    try {
        const response = await sesClient.send(new SendEmailCommand(params))
        if (response) {
            console.log('Wiadomość e-mail została wysłana. ID wiadomości:', response.MessageId)
            return true
        }
    } catch (error) {
        console.error('Wystąpił błąd podczas wysyłania wiadomości e-mail:', error)
    }

    return false
}
