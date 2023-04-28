import './fuelQuoteForm.css'
import { useEffect, useContext, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import axios from 'axios'
import { AuthContext } from '../context/authContext';
import "./fuelQuoteForm.css"
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { useNavigate } from "react-router-dom";



export default function App() {
  const { register, handleSubmit, formState: {errors}, getValues, setValue } = useForm();
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate()

  const [userVal, setUserVal] = useState({
    address : "",
    locationFactor: 0,
    historyFactor: 0
  })

  useEffect(()=> {
    const fetchData = async (e) => {
      try{
        const res = await axios.get("/quotes/getUserInfo/" + currentUser.email);
               
        let userInfo = res.data;
        let isTexas = 0.04;
        let deliveryAdd = userInfo.address1 + ", " + userInfo.address2 + ", " + userInfo.city + ", " + userInfo.states + ", " + userInfo.zipcode
        if(userInfo.states === "TX")
          isTexas  = 0.02;
        
        const hasHistory = await axios.get("/quotes/checkHistory/" + currentUser.email);

        setUserVal({address:deliveryAdd, locationFactor:isTexas, historyFactor:hasHistory.data})
      }catch (err){
        console.log(err)
      }
  };
  fetchData();
},[]);



  const PriceModule = (e) => {
    e.preventDefault();

    let ppGallon = 1.5; //price per gallon
    let grFactor = 0.03; //gallons requested Factor
    let profitFactor = 0.1; //company profit factor

    if (getValues("gallonsRequested") >= 1000) //if requested more than 1000 gallons, decrease grFactor
      grFactor = 0.02;

    console.log("grFactor = " + grFactor)
    console.log("location factor = " + userVal.locationFactor)
    console.log("history Factor = " + userVal.historyFactor)

    let margin = ppGallon * (userVal.locationFactor - userVal.historyFactor + grFactor + profitFactor);
    let suggestPrice = ppGallon + margin
    let amountDue = getValues("gallonsRequested") * suggestPrice;
    suggestPrice = suggestPrice.toFixed(2);
    amountDue = amountDue.toFixed(2);

    setValue("realPrice", amountDue);
    setValue("suggPrice", suggestPrice);

  }
  


  
  return (
    <main>
      <Button className = "returnButton" variant="contained"  onClick={() => { navigate("/QuoteHistory"); }} color='secondary' endIcon={<HomeIcon />}>
          See Quotes History
        </Button>
      <header className = "quoteFormHeader">
        Quote Form
      </header>
      <p className = "quoteFormDesc">
        Please provide us with a few details to help us get started on your quote
      </p>
      <div className = "quoteForm">
        <form 
          onSubmit={handleSubmit( async (data) => {
            try{
              let values = data;
              values.email = currentUser.email;

              const res = await axios.post("/quotes/quoteForm", values);
              if(res.status == 200)
                alert("Form Succefully Saved")
              console.log(values);

            }catch(err){
              console.log(err);
            }
          })}
        >
          <label>Number of Gallons:</label>
          <input {...register("gallonsRequested", {required: 'A valid number is required.'})} type="number" placeholder="ex.  1,000" />
          <p>{errors.gallonsRequested?.message}</p>
          
          <label>Desired Delivery Date: </label>
          <input {...register("deliveryDate", {required: 'A valid date is required.'})} type="date" minLength="5" placeholder="3/14/53"/>
          <p>{errors.deliveryDate?.message}</p>
          
          <label>Delivery Address: </label>
          <input {...register("address", {required: 'A valid address is required.'})} readOnly = { true } value= { userVal.address }/> 
          <p>{errors.address?.message}</p>
  
          <Button variant='contained' onClick = {PriceModule} color='secondary' endIcon = {<AssignmentTurnedInIcon />}> Get Quote </Button>


          <div className = "bottomForm">
            <label>Suggested Rate: </label>
            <input {...register("suggPrice", {required: 'A valid monetary value is required.'})} readOnly = { true } placeholder="ex. 65" />
            <p>{errors.suggPrice?.message}</p>
  
            <label>Total price: </label>
            <input {...register("realPrice", {required: 'A valid monetary value is required.'})} readOnly = { true }   placeholder="ex. 65"/>
            <p>{errors.realPrice?.message}</p>
  
            <Button variant='contained' type = 'submit' color='secondary' endIcon={<SendIcon />} > Submit </Button>
          </div>
        </form>
      </div>
      <div className='sep'> </div>
      <footer className = "FORMfooter-main"> 
          <center><small>© 2023 All Rights Reserved. University of Houston. Department of Computer Science.</small></center>
      </footer>
    </main>
    
  )
}
