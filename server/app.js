import express from "express"
import AuthRoutes from "./routes/auth.js"
import quoteRoutes from './routes/form.js'
import cookieParser from "cookie-parser"
import tableRoutes from './routes/data.js'
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

await mongoose.connect('mongodb+srv://4354Quotes:gA6lACijSKBUtMLN@quotes.u9fu4i3.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected'))


const app = express();
app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use("/history", tableRoutes);
app.use("/server/auth", AuthRoutes)
app.use('/server/quotes', quoteRoutes)


export default app
