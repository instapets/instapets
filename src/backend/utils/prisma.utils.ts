import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Prisma } from '@prisma/client'

export type TPrismaErrorDescriptions = {
    uniqueConstraintFailed?: string
    recordNotFound?: string
}

export type TPrismaErrorResponse = {
    status: number
    message: string
}

const getPrismaErrorResponse = (message?: string): TPrismaErrorResponse => {
    return {
        status: StatusCodes.BAD_REQUEST,
        message: message ?? ReasonPhrases.BAD_REQUEST,
    }
}

export const checkPrismaError = (err: unknown, messages?: TPrismaErrorDescriptions): TPrismaErrorResponse => {
    const response = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const code = err.code

        switch (code) {
            case 'P2002':
                return getPrismaErrorResponse(messages?.uniqueConstraintFailed)
            case 'P2025':
                return getPrismaErrorResponse(messages?.recordNotFound)
        }
    }

    return response
}
