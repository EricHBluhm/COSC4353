//npm init -y
<<<<<<< HEAD
//npm i express, mongoose, bycryptjs, jsonwebtoken
//package.sjon - "type": "module", under main so we can
    //do imports

import express from "express"
import authRoutes from "./routes/auth.js"

const app = express();
app.use(express.json());

app.use("/server/auth", authRoutes); //on /server/auth, will use authRoutes
//so in authRoutes, server/auth/something can be defined in server/auth
//but only need to state /something in the authRoutes
//authroutes then imports the function from the controller


app.listen(8800, ()=>{
    console.log("Connected Port 8800")
})



// app.get("/test", (req,res)=>{
//     //     res.json("It WORKS!")
//     // })
=======
//npm i express
>>>>>>> parent of 1284315 (Creating auth route/controller)
