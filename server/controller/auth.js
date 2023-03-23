

export const register = (req,res) =>{
    try{

        let newUser = req.body;

        //form validaitons
        //check to see if user already exists
            //if does not, save to DB

        //add accInfo:false to newUser object
        //return newUser to frontend

    res.status(200).json(newUser)
    }catch(err){

    }


    res.json("TESTING COMPLETE from CONTROLLER")
}



export const login = (req,res) =>{
    try{
        //form validations
        //check to see if user exists
        //check to see if password matches

        //send user back to frontEnd so we can see if userAcc is true or false

    }catch(err){
        
    }


    res.json("TESTING COMPLETE from CONTROLLER")
}



export const accInfo = (req,res) =>{
    try{
        //form validations
        //match userName with

    }catch(err){
        
    }


    res.json("TESTING COMPLETE from CONTROLLER")
}
