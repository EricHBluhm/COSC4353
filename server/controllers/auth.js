import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let users = [
    {
        email: "Billy@bob.com",
        password: "1234",
        fullName: "Billy Bob",
        address1: "1234 Drive",
        address2: "Apt 2",
        city: "Town",
        zipcode: "1234567",
        userInfo: true,
    }
]

//these functions should be async when we implement the DB
//b/c we have to await the crud operations and those take time
export const register = (req,res) =>{
   try{
    let newUser = req.body;
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
    try{
        let user = req.body;
        //check to see if user exists
            //send error if failed
        //check password if correct with hash (have to fix)
            //const isPassCorrect = bcrypt.compareSync(req.body.password);
            //send error if failed

        //do jwt stuff
        const token = jwt.sign({id: user.email}, "jwtkey"); //will be user._id when doing MDB
        
        delete user.password; 
        
        //res.status(200).json({ token, user }); //send to frontend
        res.cookie("access_token", token,{
            httpOnly:true
        }).status(200).json(user);
    }catch(err){
        res.status(500).json({ error: err.message })
    }
    
}

export const userInfo = (req,res) => {
    
}