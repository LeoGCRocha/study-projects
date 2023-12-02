import { PrismaClient, User } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'SECRET CODE'

const prisma = new PrismaClient()

type AuthRequest = Request & {
    user?: User
}

export async function authenticateToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(" ")[1]
    if (!token) {
        return res.sendStatus(401)
    }
    // decode the jwt token
    try {
        const payload = jwt.verify(token, JWT_SECRET) as {
            tokenId: number
        }
        const dbToken = await prisma.token.findUnique({
            where: {
                id: payload.tokenId,
            },
            include: {
                user: true,
            }
        })
        if (!dbToken?.valid) {
            return res.status(401).json({
                error: 'API Token not valid'
            })
        }
        if (dbToken.expiration < new Date()) {
            return res.status(401).json({
                error: 'API Token is expired'
            })
        }
        req.user = dbToken.user
    } catch (e) {
        return res.status(401).json({
            error: 'Failed to authenticate'
        })
    }
    next()
}