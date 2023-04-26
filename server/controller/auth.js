import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import UserInfo from "../models/UserInfo.js"
import {hashPassword,comparePassword} from "../utils/helpers.js"

export const register = async (req,res) =>{
    try{

        let {
            email,
            password,
            hasAccInfo,
        }  = req.body;

        const foundUser  = await User.findOne({email:email}); //check to see if user already exists
        
        if(!foundUser) //if there is no user with newUser's email, create a new user
        {
            //hash password
            password = hashPassword(password);

            //create new user for MongoDB
            const newUser = new User({
                email,
                password,
                hasAccInfo,
            })

            //save newUser to DB
            const savedUser = await newUser.save(); //save to User Credential Table

            res.status(201);
            return res.json(savedUser); //return saved user to frontend
        }
        else
        {
             res.status(400);
             res.json("Account already Exists");
        }

    }catch(err){
        //res.status(500).json("TESTING COMPLETE from CONTROLLER")
    }
}

export const login = async (req,res) =>{
    try{

        let currentUser = req.body; //form data

        //check to see if user exists
        const foundUser = await User.findOne({email:currentUser.email}).exec(); 
        
        if(!foundUser) //if user doesn't exist
        {
            console.log("User does not exist")
            return res.status(500).json("Account Does Not Exist")
        }

        //check to see if password matches
         const isPasswordCorrect = comparePassword(currentUser.password,foundUser.password)

        if(!isPasswordCorrect) //if password is incorrect
        {
            console.log("Password is incorrect")
            return res.status(500).json("Password is incorrect")
        }
           
        console.log("Logged in Sucessfully")
        delete foundUser.password; //delete password so we don't send to front end

        //json webtoken
        const token = jwt.sign({id:foundUser.email}, "jwtkey");
        res.cookie("access_token", token, {
            httpOnly:true
        })
        res.status(201).json(foundUser)

    }catch(err){
        res.status(500).json(err);
    }

}

export const accInfo = async (req,res) =>{
    try{
        let {fullName,address1,address2,city,zipcode,states,email} = req.body;

        const foundUser = await User.findOne({email:email}).exec(); //check to see if user exists
        if(!foundUser)
        {
            return res.status(500).json("Account Does Not Exist")
        }

        //creating new user info entry
        const newUserInfo = new UserInfo({
            email,
            fullName,
            address1,
            address2,
            city,
            states,
            zipcode,
        })


        //if wanting to edit account info
        if(foundUser.hasAccInfo == "true")
        {
            console.log("hass acc is true")
            await UserInfo.findOneAndUpdate({email:email}, {fullName:fullName, address1: address1, address2:address2, city:city, states:states,zipcode:zipcode})
            res.status(201).json(newUserInfo);
        }

        else{
                //update User to have accountInfo
            await User.findOneAndUpdate({email:email}, {hasAccInfo: "true"}) //updating User Credentials Table

            const savedUserInfo = await newUserInfo.save(); //saving new Client Information entry

            res.status(201).json(savedUserInfo);
        }
     

    }catch(err){
        res.status(500).json(err);
    }
  
}

//logout module, not connected yet
export const logout = (req,res) => {
            res.clearCookies("access_token",{
                sameSite:"none",
                secure:true
            }).status(200).json("User Logged Out")
}