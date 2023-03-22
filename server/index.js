//npm init -y
//npm i express, mongoose

import express from "express"
import authRoutes from "./routes/auth.js"

const app = express();
app.use(express.json());

app.use("/server/auth", authRoutes);


app.listen(8800, ()=>{
    console.log("Port 8800")
})