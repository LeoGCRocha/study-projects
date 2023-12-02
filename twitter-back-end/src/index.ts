import express from 'express'
import userRoutes from './routes/userRoute'
import tweetRoute from './routes/tweetRoutes'
import authRoute from './routes/authRoute'
import { authenticateToken } from './middlewares/authMiddleware'

const app = express()

// Parse response as JSON instead string
app.use(express.json())
app.use('/user', userRoutes)
app.use('/tweet', authenticateToken, tweetRoute)
app.use('/auth', authRoute)

app.listen(3000, () => {
    console.log('Server ready at localhost:3000')
})