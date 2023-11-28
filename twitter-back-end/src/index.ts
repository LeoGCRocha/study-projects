import express from 'express'
import userRoutes from './routes/userRoute'
import tweetRoute from './routes/tweetRoutes'

const app = express()

// Parse response as JSON instead string
app.use(express.json())
app.use('/user', userRoutes)
app.use('/tweet', tweetRoute)

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(3000, () => {
    console.log('Server ready at localhost:3000')
})