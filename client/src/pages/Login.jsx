import '../App.css';
import {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import axios from "axios";
import { AuthContext } from '../context/authContext';


const Login = () => {

    const [values, setValues] = useState({
        email:"",
        password:"",
    })

    const [err,setError] = useState(null);

    const navigate = useNavigate()

    const {login} = useContext(AuthContext); //login api moved here
    const {currentUser} = useContext(AuthContext); //lets us get currentUser info
    //currentUser.address, etc.

    const inputs = [
        {
            id:1,
            name:"email",
            type:"email",
            placeholder:"Email Address",
            errorMessage:"Must be valid email address",
            label:"Email Address",
            required: true,
        },
        {
            id:2,
            name:"password",
            type:"password",
            placeholder:"Password",
            errorMessage:"Invalid Password. At least 1 lowercase, 1 uppercase and 1 special character.",
            label:"Password",
            pattern: "^(?=.{3,})(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).*$",
            required: true,
        },
    ]


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            //Below moved to authContext
                //const res = await axios.post("/auth/login", values) //post to endpoint, pass in values from form
            await login(values); //calling login from AuthContext with form values as input, which is a post api call
           
            console.log()
            if (currentUser.userInfo === "false") //if user just registered
            {
                navigate("/accReg"); //move to accReg page to fill in rest of info
            }
            else
                navigate("/QuoteHistory");

            //testing:    
                //console.log(res.data)
                //console.log(res.data.userInfo)
    
        }
        catch(err){
            //need to send a res.status(409)
            //setError(err.response.data)
        }
    };
   

    const onChange = (e) => {
        //spread previous values, and for each target name, update them by using the value (what we are inputing into the form)
        setValues({...values, [e.target.name]: e.target.value})
    }

        //console.log(values);
    return (
        <div className = "Login">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {inputs.map(input=>(
                    <FormInput key={input.id} 
                        {...input} 
                        value={values[input.name]}
                        onChange={onChange}  
                    />
                ))}
                <button>Submit</button>
                {/* {err && <p>Account already Exists!</p>} */}
                <span>Don't have an account? <Link to="/Register"> Register</Link></span>
            </form>
        </div>
    )
}
export default Login;


//inputs.map
    //for each object in inputs array, create a formInput

//{...input} 
    //pass everything in input array as a prop

//values[input.name]
    //take values object, and search for value at that location