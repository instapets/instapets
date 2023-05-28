import { startServer } from './server'
import { config } from './config'
import { prisma } from './database'
import 'dotenv/config'

async function main() {
    await startServer(config.server)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
