import express from "express"
import AuthRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"



const app = express();
app.use(cookieParser())
app.use(express.json());

app.use("/server/auth", AuthRoutes)

export default app