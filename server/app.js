import express from "express"
import AuthRoutes from "./routes/auth.js"
import quoteRoutes from './routes/form.js'
import cookieParser from "cookie-parser"
//import tableRoutes from './routes/data.js'
import mongoose from "mongoose"
import cors from 'cors'


const app = express();
app.use(cors())
app.use(cookieParser())
app.use(express.json());
//app.use("/history", tableRoutes);
app.use("/server/auth", AuthRoutes)
app.use('/server/quotes', quoteRoutes)

main().catch(err => console.log(err));
     
async function main() {
    //await mongoose.connect('mongodb://127.0.0.1:27017/fuelQuotes'); //local server
    await mongoose.connect('mongodb+srv://4354Quotes:gA6lACijSKBUtMLN@quotes.u9fu4i3.mongodb.net/?retryWrites=true&w=majority');
}


export default app
