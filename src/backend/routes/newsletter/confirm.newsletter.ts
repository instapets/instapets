import { Request, Response } from 'express'

import { TRoute } from '../types'

export default {
    method: 'get',
    path: '/api/newsletter/confirm',
    validators: [],
    handler: async (req: Request, res: Response) => {
        // Jeśli poprawnie aktywowano maila to sprawdź czy istnieje użytkownik z takim mailem i połącz
        res.send(`I'm alive!`)
    },
} as TRoute
