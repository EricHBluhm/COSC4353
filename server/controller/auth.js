
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

        //form validaitons
        //check to see if user already exists
            //if does not, save to DB

        //add accInfo:false to newUser object
        //return newUser to frontend
        users.push(newUser);
        res.json(newUser)
    }catch(err){
        res.json("TESTING COMPLETE from CONTROLLER")
    }
}

export const login = (req,res) =>{
    try{

        let currentUser = req.body;

        //form validations

        //check to see if user exists and password matches
        let foundUser = users.find(user => user.email === currentUser.email );
        if(!foundUser)
            return res.status(500).json("Account Does Not Exist")
        if(foundUser.password != currentUser.password)
            return res.status(500).json("Password is incorrect")

        //send user back to frontEnd so we can see if userAcc is true or false
        res.json(foundUser)
    }catch(err){
        
    }

}



export const accInfo = (req,res) =>{
    try{
        let currentUser = req.body;
        //form validation

        let foundUser = users.find(user => user.email === currentUser.email );

        res.json(currentUser);

    }catch(err){
        
    }


  
}
