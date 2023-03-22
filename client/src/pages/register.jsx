import '../App.css';
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";


const Register = () => {

    const [values, setValues] = useState({
        email:"",
        password:"",
        confirmPassword: "",
    })

    const navigate = useNavigate()

    const inputs = [
        {
            id:1,
            name:"email",
            type:"email",
            placeholder:"Email Address",
            errorMessage:"Must be valid email address",
            label:"Email Address",
            // pattern: "^[a-zA-Z]{2,50}$",
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
        {
            id:3,
            name:"confirmPassword",
            type:"password",
            placeholder:"Password",
            errorMessage:"Passwords do not match",
            label:"Confirm Password",
            pattern: values.password,
            required: true,
        },
    ]

<<<<<<< HEAD
    // // "proxy":"https://localhost:8800/server/"
    const handleSubmit = async (e) => {
        e.preventDefault();//prevent refreshing
        try{
            //send info to server
            const res = await axios.post("auth/register", values) //post to endpoint, pass in values from form
            console.log(res.data)
            console.log(res.data.userInfo)
            console.log(`Hello , ${res.data.password}`)

            //navigate("/Login")
    
        }
        catch(err){
            //need to send a res.status(409)
            setError(err.response.data)
        }
=======
    const handleSubmit = (e) => {
        e.preventDefault();
        //send info to auth/backend
        navigate("/Login")
        console.log("submitted")
>>>>>>> parent of 69884ae (Post register route)
    };

    const onChange = (e) => {
        //spread previous values, and for each target name, update them by using the value (what we are inputing into the form)
        setValues({...values, [e.target.name]: e.target.value})
    }

        //console.log(values);
    return (
        <div className = "Register">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                {inputs.map(input=>(
                    <FormInput key={input.id} 
                        {...input} 
                        value={values[input.name]}
                        onChange={onChange}  
                    />
                ))}
                <button>Submit</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    )
}
export default Register;


//inputs.map
    //for each object in inputs array, create a formInput

//{...input} 
    //pass everything in input array as a prop

//values[input.name]
    //take values object, and search for value at that location