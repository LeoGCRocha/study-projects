import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticateToken } from '../middlewares/authMiddleware'

const router = Router()
const prisma = new PrismaClient()

///////////////////////////
// USER CRUD ENDPOINTS ///
//////////////////////////
// Create user
router.post('/', async (req, res) => {
    try {
        const { email, name, username } = req.body
        const result = await prisma.user.create({
            data: {
                email,
                name,
                username
            }
        })
        res.json(result)
    } catch (e) {
        res.status(400).json({
            error: "Username and email should be unique"
        })
    }
})

// List users
router.get('/', authenticateToken, async (req, res) => {
    const allUser = await prisma.user.findMany({
        select: {
            id: true,
            name: true, 
            image: true,
            bio: true,
        }
    })
    res.json(allUser)
})

// Get a single user
router.get('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            tweets: true
        }
    })
    res.send(user)
})

// Update user
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params
    const { bio, name, image } = req.body
    try {
        const result = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data:{
                bio,
                name, 
                image
            }
        })
        res.send(result)
    } catch(e) {
        res.status(400).json({
            error: 'Something went wrong when try to update user.'
        })
    }
})

// Delete a user
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params
        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
        res.sendStatus(200)
    } catch (e) {
        res.status(400).json({
            error: 'User does not exists.'
        })
    }
})

export default router