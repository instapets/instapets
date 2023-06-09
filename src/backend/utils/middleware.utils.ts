import { Request, Response, NextFunction } from 'express'
import { verifyToken } from './jwt.utils'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

const SECRET = (process.env.SECRET_KEY as string) ?? 'XYZ'

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    const parsedToken = token?.replace('Bearer ', '')
    const result = verifyToken(parsedToken ?? '', SECRET)

    if (!token || !result.isValid) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            errors: [ReasonPhrases.UNAUTHORIZED],
        })
    } else {
        next()
    }
}
