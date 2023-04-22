import '../App.css';
import "../components/formInput.css";
import {useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import axios from "axios";
import { AuthContext } from '../context/authContext';

const QuoteForm = () => {

    const {currentUser} = useContext(AuthContext); //lets us get currentUser info

    const [userVal, setUserVal] = useState({
        deliveryAddress:"",
        isTexas: "false",
        hasHistory: "false",
    })


    useEffect(()=> {
        const fetchData = async (e) => {
            try{
                console.log("Before accReg post call")
                const res = await axios.get("/form/getUserInfo/" + currentUser.email);
                let userInfo = res.data;
                let texas = "false";
                let deliveryAdd = userInfo.address1 + ", " + userInfo.address2 + ", " + userInfo.city + ", " + userInfo.states + ", " + userInfo.zipcode
                if(userInfo.states === "TX")
                    texas = "true";
                
                let history = "false";
                // const hasHistory = await axios.get("/form//checkHistory/" + currentUser.email);

                // if 


                setUserVal({deliveryAddress:deliveryAdd, isTexas:texas, hasHistory:history})
                //navigate("/QuoteHistory")
                //console.log(res.data.hello)
                //console.log(res.data.values.zipcode)
            }catch (err){
                console.log(err)
            }
        };
        fetchData();
    },[]);
       
    console.log("Current history is " + userVal.isTexas + " ")

    // useEffect(() => {
    //     fetchTableData()
    //   }, [])
      
    //   async function fetchTableData(){
   
    //     console.log(currentUser.email)
    //     const URL = "http://localhost:8800/server/getUserInfo/:" + currentUser.email
    //     const response = await fetch(URL)
    //     const res = response.json()
    //     //setData(users)
    //     console.log(res);
    //     console.log("sdfsdf")
     
 
    //   }


    const [values, setValues] = useState({
        gallonsRequested:"",
        deliveryAddress:"",
        deliveryDate:"",
        suggestedPrice:"",
        totalAmount:"",
    })

    const navigate = useNavigate()

    const inputs = [
        {
            id:1,
            name:"gallonsRequested",
            type:"text",
            placeholder:"0",
            //errorMessage:"Invalid name.",
            label:"Number of Gallons",
            //pattern: "^[a-zA-Z_][a-zA-Z_ ]*[a-zA-Z_]{2,50}$",
            required: true,
        },
        {
            id:2,
            name:"deliveryAddress",
            type:"text",
            placeholder:" ",
            //errorMessage:"Enter Valid Address",
            label:"Delivery Address",
            //pattern: "^[a-zA-Z0-9_][a-zA-Z0-9_ ]*[a-zA-Z0-9_]$",
            required: true,
        },
        {
            id:3,
            name:"deliveryDate",
            type:"date",
            placeholder:"mm/dd/yyyy",
            //errorMessage:"",
            label:"Desired Delivery Date",
            //pattern: "^[a-zA-Z0-9]{2,100}$",
            required: true,
        },
        {
            id:4,
            name:"suggestedPrice",
            type:"text",
            placeholder:"0",
            //errorMessage:"Invalid City Name. Text Only.",
            label:"Suggested Rate",
            //pattern: "^[a-zA-Z ]{2,100}$",
            required: true,
        },
        {
            id:5,
            name:"totalAmount",
            type:"text",
            placeholder:"0",
            errorMessage:"Invalid Zipcode. 5-8 Numbers.",
            label:"Total Price",
            //pattern: "^[0-9]{5,8}$",
            required: true,
        }
    ]


    // let testing = {
    //     hello : "hello",
    //     pls: "PlEASE"
    // }
   
    const PriceModule = (e) => {
        e.preventDefault();
        //setValues(values.gallonsRequested =  "30")


        setValues({...values, gallonsRequested: "30"})
        console.log(values)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log("Before accReg post call")
           // const res = await axios.post("/auth/accInfo", values);
            
            //navigate("/QuoteHistory")
            //console.log(res.data.hello)
            //console.log(res.data.values.zipcode)
        }catch (err){
            console.log(err)
        }
    };

    const onChange = (e) => {
        //spread previous values, and for each target name, update them by using the value (what we are inputing into the form)
        setValues({...values, [e.target.name]: e.target.value})
    }

        //console.log(values);
    return (
        <div className = "accReg">
            <form>
                <h1>Quote Form</h1>
                {inputs.map(input=>(
                    <FormInput key={input.id} 
                        {...input} 
                        value={values[input.name]}
                        onChange={onChange}  
                    />
                ))}
                <button onClick= {PriceModule}>Get Quote</button>
                <button onClick= {handleSubmit}>Submit</button>
            </form>
        </div>
    )
}
export default QuoteForm;


//inputs.map
    //for each object in inputs array, create a formInput

//{...input} 
    //pass everything in input array as a prop

//values[input.name]
    //take values object, and search for value at that location

//

//['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']