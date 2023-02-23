import '../App.css';
import "../components/formInput.css";
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";


const AccRegistration = () => {

    const [values, setValues] = useState({
        fullName:"",
        address1:"",
        address2:"",
        city:"",
        state:"",
        zipcode:"",
    })

    const navigate = useNavigate()

    const inputs = [
        {
            id:1,
            name:"fullName",
            type:"text",
            placeholder:"Full Name",
            errorMessage:"Invalid name.",
            label:"Full Name",
            pattern: "^[a-zA-Z]{2,50}$",
            required: true,
        },
        {
            id:2,
            name:"address1",
            type:"text",
            placeholder:"Address 1",
            errorMessage:"",
            label:"Address 1",
            pattern: "^[a-zA-Z0-9]{2,100}$",
            required: true,
        },
        {
            id:3,
            name:"address2",
            type:"text",
            placeholder:"Address 2",
            errorMessage:"",
            label:"Address 2",
            pattern: "^[a-zA-Z0-9]{2,100}$",
            required: true,
        },
        {
            id:4,
            name:"city",
            type:"text",
            placeholder:"City",
            errorMessage:"Invalid City Name. Text Only.",
            label:"City",
            pattern: "^[a-zA-Z ]{2,100}$",
            required: true,
        },
        {
            id:5,
            name:"zipcode",
            type:"text",
            placeholder:"Zipcode",
            errorMessage:"Invalid Zipcode. 5-8 Numbers.",
            label:"Zipcode",
            pattern: "^[0-9]{5,8}$",
            required: true,
        }
    ]

    const states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitted")
    };

    const onChange = (e) => {
        //spread previous values, and for each target name, update them by using the value (what we are inputing into the form)
        setValues({...values, [e.target.name]: e.target.value})
    }

        //console.log(values);
    return (
        <div className = "accReg">
            <form onSubmit={handleSubmit}>
                <h1>Account Info</h1>
                {inputs.map(input=>(
                    <FormInput key={input.id} 
                        {...input} 
                        value={values[input.name]}
                        onChange={onChange}  
                    />
                ))}
                <div className="formInput">
                <label>State</label>
                    <select name="tates" id="states">
                        {states.map(state=>(
                            <option value={state[1]} requried>{state[0]}</option>
                        ))}
                    </select> 
                </div>
                <button>Submit</button>
            </form>
        </div>
    )
}
export default AccRegistration;


//inputs.map
    //for each object in inputs array, create a formInput

//{...input} 
    //pass everything in input array as a prop

//values[input.name]
    //take values object, and search for value at that location

//

//['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']