import '../App.css';
import "../components/formInput.css";
import {useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import axios from "axios";
import { AuthContext } from '../context/authContext';
import { useForm } from "react-hook-form";

const QuoteForm = () => {

    const {currentUser} = useContext(AuthContext); //lets us get currentUser info

    const [userVal, setUserVal] = useState({ //user values from backend
        address:"",
        locationFactor: 0,
        historyFactor: 0,
    })


    useEffect(()=> {
        const fetchData = async (e) => {
            try{

                const res = await axios.get("/form/getUserInfo/" + currentUser.email);
               
                let userInfo = res.data;
                let isTexas = 0.04;
                let deliveryAdd = userInfo.address1 + ", " + userInfo.address2 + ", " + userInfo.city + ", " + userInfo.states + ", " + userInfo.zipcode
                if(userInfo.states === "TX")
                    isTexas  = 0.02;
                
                const hasHistory = await axios.get("/form/checkHistory/" + currentUser.email);
               
                setUserVal({address:deliveryAdd, locationFactor:isTexas, historyFactor:hasHistory.data})
                //setValues(prev=>({...prev, address:userVal.address}))
        
            }catch (err){
                console.log(err)
            }
        };
        fetchData();
    },[]);

    useEffect(() => {
        setValues(prev=>({...prev, address:userVal.address}))
    }, [userVal]); //calls this when UserVal is changed, so it should put it in the input after the first useEfect

    const [values, setValues] = useState({ //values for form
        gallonsRequested:0,
        address: "",
        deliveryDate:"",
        suggPrice:0,
        realPrice:0,
    })

    console.log("Current address is " + userVal.address + " ")

 

    const navigate = useNavigate()

    const inputs = [
        {
            id:1,
            name:"gallonsRequested",
            type:"number",
            //placeholder:"0",
            errorMessage:"Numbers Only",
            label:"Number of Gallons",
            //pattern: "^[0-9]",
            required: true,
        },
        {
            id:2,
            name:"address",
            type:"text",
            //placeholder:" ",
            //errorMessage:"Enter Valid Address",
            label:"Delivery Address",
            //pattern: "^[a-zA-Z0-9_][a-zA-Z0-9_ ]*[a-zA-Z0-9_]$",
            required: true,
            readOnly: true,
        },
        {
            id:3,
            name:"deliveryDate",
            type:"Date",
            placeholder:"mm/dd/yyyy",
            //errorMessage:"",
            label:"Desired Delivery Date",
            //pattern: "^[a-zA-Z0-9]{2,100}$",
            required: true,
        },
        {
            id:4,
            name:"suggPrice",
            type:"number",
           // placeholder:"0",
            //errorMessage:"Invalid City Name. Text Only.",
            label:"Suggested Rate",
            //pattern: "^[a-zA-Z ]{2,100}$",
            required: true,
            readOnly: true,
        },
        {
            id:5,
            name:"realPrice",
            type:"number",
           // placeholder:"0",
            errorMessage:"Invalid Zipcode. 5-8 Numbers.",
            label:"Total Price",
            //pattern: "^[0-9]{5,8}$",
            required: true,
            readOnly: true,
        }
    ]
   
    const PriceModule = (e) => {
        e.preventDefault();
        //setValues(values.gallonsRequested =  "30")

        let ppGallon = 1.5; //price per gallon
        let grFactor = 0.03; //gallons requested Factor
        let profitFactor = 0.1; //company profit factor

        if (values.gallonsRequested >= 1000) //if requested more than 1000 gallons, decrease grFactor
            grFactor = 0.02;

        console.log("grFactor = " + grFactor)
        console.log("location factor = " + userVal.locationFactor)
        console.log("history Factor = " + userVal.historyFactor)

        let margin = ppGallon * (userVal.locationFactor - userVal.historyFactor + grFactor + profitFactor);
        let suggestPrice = ppGallon + margin
        let amountDue = values.gallonsRequested * suggestPrice;

        setValues({...values, suggPrice: suggestPrice, realPrice: amountDue})

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            values.gallonsRequested = Number(values.gallonsRequested)
            values.email = currentUser.email;
            console.log(values)
            const res = await axios.post("/quotes/quoteForm", values);
        
            navigate("/QuoteHistory")
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