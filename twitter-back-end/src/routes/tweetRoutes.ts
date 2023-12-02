import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

///////////////////////
// TWEET CRUD ENDPOINTS
///////////////////////
// Create Tweet
router.post('/', async (req, res) => {
    try {
        const { content, image } = req.body
        // @ts-ignore
        const user = req.user
        try {
            const userId = Number(user.id)
            const result = await prisma.tweet.create({
                data: {
                    content, 
                    image,
                    userId
                }
            })
            res.sendStatus(200)
        } catch (e) {
            return res.sendStatus(401)
        }
    } catch (e) {
        res.status(400).json({
            error: 'Cannot POST this tweet.'
        })
    }
})

// List Tweets
let customSelectToTweet = {
    select: {
        id: true,
        content: true,
        updatedAt: true,
        createdAt: true,
        image: true,
        impression: true,
        user: {
            select: {
                id: true,
                name: true,
                username: true,
                image: true,
            }
        }
    }
}
router.get('/', async (req, res) => {
    let tweetOfAllUsers = await prisma.tweet.findMany(customSelectToTweet)
    res.json(tweetOfAllUsers)
})

// Get a single Tweet
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        let oneTweet = await prisma.tweet.findUnique({
            where: {
                id: Number(id)
            },
            ...customSelectToTweet
        })
        res.json(oneTweet)
    } catch (e) {
        res.status(400).json({
            error: `Tweet with ${id} was not found`
        })
    }
})

// Update Tweet
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { content, image } = req.body
        const result = await prisma.tweet.update({
            where: {
                id: Number(id)
            },
            data: {
                content,
                image
            }
        })
        res.json(result)
    } catch (e) {
        res.status(400).json({
            error: 'Cannot update this tweet, something bad happen.'
        })
    }
})

// Delete a Tweet
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await prisma.tweet.delete({
            where: {
                id: Number(id)
            }
        })
        res.sendStatus(203)
    } catch (e) {
        res.status(400).json({
            error: 'Cannot delete this tweet or doesnt exists.'
        })
    }
})

export default router