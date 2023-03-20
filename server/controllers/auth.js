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

//these functions should be async when we implement the DB
//b/c we have to await the crud operations and those take time
export const register = (req,res) =>{
   try{
    const newUser = req.body;
    //check to see if email already is use
        //if so return //need to send a res.status(409)
    //else register:

    //hash password
    //const salt = bcrypt.genSaltSync(10);
    //newUser.password= bcrypt.hasySync(newUser.password,salt);
    //newUser.password = hashedPassword;
    newUser.userInfo = false;

    users.push({newUser});
    res.json(newUser); //send recived status code and send a version of new User to front end if needed
   }
   catch (err){
        res.status(500).json({ error: err.message })
   }
}

export const login = (req,res) => {
    
}

export const userInfo = (req,res) => {
    
}