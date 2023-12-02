import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { sendEmail } from '../services/emailService'

dotenv.config()

const EMAIL_TOKEN_EXPIRATIONS_MINUTES = 10
const AUTHENTICATION_EXPIRATION_HOURS = 12
const JWT_SECRET = process.env.JWT_SECRET!

const router = Router()
const prisma = new PrismaClient()

///////////////////////////
// ENDPOITS TO AUTH ROUTES
///////////////////////////

// Genreate a random 8 digit number as the email token
function genreateEmailToken(): string {
    return Math.floor(100000000 + Math.random() * 900000000).toString()
}

function generateAuthToken(tokenId: number): string {
    const jwtPayload = {
        tokenId
    }

    return jwt.sign(jwtPayload, JWT_SECRET, {
        algorithm: 'HS256',
        noTimestamp: true
    })
}

// sigin/signout
router.post('/login', async (req, res) => {
    try {
        const { email } = req.body
        // generate a token
        const emailToken = genreateEmailToken()
        const expiration = new Date(new Date().getTime() + EMAIL_TOKEN_EXPIRATIONS_MINUTES * 60 * 1000)
        const createdToken = await prisma.token.create({
            data: {
                type: 'EMAIL',
                emailToken,
                expiration,
                user: {
                    connectOrCreate: {
                        where: { email },
                        create: {
                            email,
                            name: email.split("@")[0],
                            username: email.split("@")[0]
                        }
                    }
                }
            }
        })
        sendEmail(email, createdToken.emailToken)
        res.sendStatus(200)
    } catch (e) {
        res.status(401).json({
            error: 'Failed to create email token'
        })
    }
})

// Validate the email token
// Generate long-lived JWT Token
router.post('/authenticate', async (req, res) => {
    const { email, emailToken } = req.body

    const dbEmailToken = await prisma.token.findUnique({
        where: {
            emailToken
        },
        include: {
            user: true
        }
    })

    if (!dbEmailToken || !dbEmailToken.valid) {
        return res.sendStatus(401)
    }

    if (dbEmailToken.expiration < new Date()) {
        return res.status(401).json({
            error: 'Token expired'
        })
    }

    if (email !== dbEmailToken.user.email) {
        return res.sendStatus(401)
    }

    // Here we validated that the user it hte owner of the email
    // Generate an API Token using JWT 
    const expiration = new Date(
        new Date().getTime() + AUTHENTICATION_EXPIRATION_HOURS * 24 * 60 * 1000
    )
    const apiToken = await prisma.token.create({
        data: {
            type: 'API',
            expiration,
            user: {
                connect: {
                    email
                }
            }
        }
    })

    // Invalidate the used email token
    await prisma.token.update({
        where: {
            id: dbEmailToken.id
        },
        data: {
            valid: false
        }
    })

    // generate the JWT 
    const authToken = generateAuthToken(apiToken.id)
    res.json({ authToken })
})

export default router