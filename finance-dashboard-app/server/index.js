import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import morgan from "morgan"
import kpiRoutes from './routes/kpi.js'
import KPI from './models/KPI.js'
import { kpis, products } from './data/data.js'
import productsRoutes from "./routes/product.js"
import Product from './models/Product.js'

/* CONFIGURATIONS */
dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(cors())

/* ROUTES */
app.use("/kpi", kpiRoutes)
app.use("/product", productsRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000
mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
        /* ADD DATA ONE TIME ONLY OR AS NEEDED */
        // await mongoose.connection.db.dropDatabase()
        // KPI.insertMany(kpis)
        // Product.insertMany(products)
    })
    .catch((error) => {
        console.log(`Cannot connect because of ${error}`)
    })