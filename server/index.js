//npm init -y
//npm i express

import express from "express"
import AuthRoutes from "./routes/auth.js"



const app = express();
app.use(express.json());

app.use("/server/auth", AuthRoutes)




app.listen(8800, () =>{
    console.log("Connected Port 8800")
})