import bcrypt from "bcryptjs"


let users = [
    {
        email: "Billy@bob.com",
        password: "Test!1",
        fullName: "Billy Bob",
        address1: "1234 Drive",
        address2: "Apt 2",
        city: "Town",
        zipcode: "1234567",
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
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt)
            newUser.password = hash;

            users.push(newUser);
            res.json(newUser)
        }
        else
        {
            return res.status(500).json("Account already Exists")
        }

    }catch(err){
        res.json("TESTING COMPLETE from CONTROLLER")
    }
}

export const login = (req,res) =>{
    try{

        let currentUser = req.body; //form data

        //check to see if user exists and password matches
        let foundUser = users.find(user => user.email === currentUser.email );
        if(!foundUser)
        {
            console.log("User does not exist")
            return res.status(500).json("Account Does Not Exist")
        }

        const isPasswordCorrect = bcrypt.compareSync(currentUser.password,foundUser.password )
        
        if(!isPasswordCorrect)
        {
            console.log("Password is incorrect")
            return res.status(500).json("Password is incorrect")
        }
           
        console.log("Logged in Sucessfully")
        //send user back to frontEnd so we can see if userAcc is true or false
        res.json(foundUser)
    }catch(err){
        console.log(err);
    }

}



export const accInfo = (req,res) =>{
    try{
        let currentUser = req.body;

        let foundUser = users.find(user => user.email === currentUser.email );

        //update with values from currentUser

        res.json(currentUser);

    }catch(err){
        
    }


  
}
