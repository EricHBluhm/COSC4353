import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

let users = [
    {
        email: "Billy@bob.com",
        password: "1234",
        fullName: "Billy Bob",
        address1: "1234 Drive",
        address2: "Apt 2",
        city: "Town",
        zipcode: "1234567",
        userInfo: false,
    }
]


export const register = (req,res) =>{
   try{
    const newUser = req.body;
    //check to see if email already is use
        //if so return
    //else register:

    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword= bcrypt.hasySync(req.body.password,salt);
    newUser.password = hashedPassword;

    users.push({newUser, userInfo:false});
    res.status(201).json(savedUser); //send recived status code and send a version of new User to front end if needed
   }
   catch (err){
        res.status(500).json({ error: err.message })
   }
}

export const login = (req,res) => {
    
}