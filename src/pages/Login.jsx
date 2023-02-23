import '../App.css';
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";


const Login = () => {

    const [values, setValues] = useState({
        email:"",
        password:"",
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


    const handleSubmit = (e) => {
        e.preventDefault();
        //send info to auth/backend
        navigate("/accReg")
        console.log("submitted")
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