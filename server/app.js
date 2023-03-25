import express from "express"
import AuthRoutes from "./routes/auth.js"
import quoteRoutes from './routes/form.js'
import cookieParser from "cookie-parser"
import tableRoutes from './routes/data.js'



const app = express();
app.use(cookieParser())
app.use(express.json());

app.use("/history", tableRoutes);
app.use("/server/auth", AuthRoutes)
app.use('/server/quotes', quoteRoutes)

export default app
