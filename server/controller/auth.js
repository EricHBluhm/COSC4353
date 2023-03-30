import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import UserInfo from "../models/UserInfo.js"

//Users DB
let users = [
    {
        email: "Billy@bob.com",
        password: "Test!1",
        fullName: "Billy Bob",
        address1: "1234 Drive",
        address2: "Apt 2",
        city: "Town",
        zipcode: "1234567",
        state: "TX",
        userInfo: true,
    }
    
]


export const register = async (req,res) =>{
    try{

        const {
            email,
            password,
            hasAccInfo,
        }  = req.body;

        console.log(email)
        const foundUser  = await User.findOne({email:email}); //check to see if user already exists
        //let foundUser = users.find(user => user.email === newUser.email );
        if(!foundUser) //if there is no user with newUser's email, create a new user
        {
            //hash password
                //const salt = bcrypt.genSaltSync(10);
                //const hash = bcrypt.hashSync(req.body.password, salt)
                //newUser.password = hash;

            //create new user for MongoDB
            const newUser = new User({
                email,
                password,
                hasAccInfo,
            })

            //users.push(newUser);
            //save newUser to DB
            const savedUser = await newUser.save();

            res.status(201);
            return res.json(savedUser);
        }
        else
        {
             res.status(400);
             return res.json("Account already Exists");
        }

    }catch(err){
        //res.status(500).json("TESTING COMPLETE from CONTROLLER")
    }
}

export const login = async (req,res) =>{
    try{

        let currentUser = req.body; //form data

        //check to see if user exists
        //let foundUser = users.find(user => user.email === currentUser.email );
        const foundUser = await User.findOne({email:currentUser.email}).exec();
        //const foundUser = await User.findById(currentUser._id).exec();
        
        if(!foundUser)
        {
            console.log("User does not exist")
            return res.status(500).json("Account Does Not Exist")
        }

        //check to see if password matches
            //const isPasswordCorrect = bcrypt.compareSync(currentUser.password,foundUser.password )
            //if(!isPasswordCorrect)

        if(currentUser.password != foundUser.password)
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

        //send user back to frontEnd so we can see if userAcc is true or false
        //res.json(foundUser)
    }catch(err){
        res.status(500).json(err);
    }

}

export const accInfo = async (req,res) =>{
    try{
        let {fullName,address1,address2,city,zipcode,states,email} = req.body;

        //let foundUser = users.find(user => user.email === curUser );
        const foundUser = await User.findOne({email:email}).exec();
        if(!foundUser)
        {
            console.log("User does not exist")
            return res.status(500).json("Account Does Not Exist")
        }

        //const updateUser = await User.findOneAndUpdate(email:)

        console.log("creating new user info table")
        const newUserInfo = new UserInfo({
            email,
            fullName,
            address1,
            address2,
            city,
            states,
            zipcode,
        })

        //update User to have accountInfo
        await User.findOneAndUpdate({email:email}, {hasAccInfo: "true"})
        // foundUser.fullname = fullName;
        // foundUser.address1 = address1;
        // foundUser.address2 = address2;
        // foundUser.city = city;
        // foundUser.zipcode = zipcode;
        // foundUser.state = states;
        // foundUser.userInfo = true;

        //update with values from currentUser

        console.log("creating new user info table2")

        const savedUserInfo = await newUserInfo.save();

        console.log("creating new user info table")

        res.status(201).json(savedUserInfo);

    }catch(err){
        res.status(500).json(err);
    }
  
}