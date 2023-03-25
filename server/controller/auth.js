import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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


export const register = (req,res) =>{
    try{

        let newUser = req.body;

        let foundUser = users.find(user => user.email === newUser.email );
        if(!foundUser) //if there is no user with newUser's email, create a new user
        {
            //hash password
                //const salt = bcrypt.genSaltSync(10);
                //const hash = bcrypt.hashSync(req.body.password, salt)
                //newUser.password = hash;

            users.push(newUser);
            res.status(201);
            return res.json(newUser);
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

export const login = (req,res) =>{
    try{

        let currentUser = req.body; //form data

        //check to see if user exists
        let foundUser = users.find(user => user.email === currentUser.email );
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



export const accInfo = (req,res) =>{
    try{
        let {fullName,address1,address2,city,zipcode,states,curUser} = req.body;

        let foundUser = users.find(user => user.email === curUser );

        if(!foundUser)
        {
            console.log("User does not exist")
            return res.status(500).json("Account Does Not Exist")
        }

        foundUser.fullname = fullName;
        foundUser.address1 = address1;
        foundUser.address2 = address2;
        foundUser.city = city;
        foundUser.zipcode = zipcode;
        foundUser.state = states;
        foundUser.userInfo = true;

        //update with values from currentUser

        res.status(201).json(foundUser);

    }catch(err){
        res.status(500).json(err);
    }
  
}