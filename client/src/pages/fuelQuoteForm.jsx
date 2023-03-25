import './fuelQuoteForm.css'
import { useState, useContext } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import axios from 'axios'
import { AuthContext } from '../context/authContext';



export default function App() {
  const [date, setDate] = useState(new Date());
  const { register, handleSubmit, formState: {errors} } = useForm();
  const {currentUser} = useContext(AuthContext);

  
  return (
    <main>
      <h1 className = "quoteFormHeader">
        <img src = "https://drive.google.com/thumbnail?id=1STsn8_hZ81Nlf4wNu9BFxc2_pbfSouRI" width={50} height={50} />
        Fuel Quote Form
        <img src = "https://drive.google.com/thumbnail?id=1STsn8_hZ81Nlf4wNu9BFxc2_pbfSouRI" width={50} height={50} />
      </h1>
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
              console.log(values);

            }catch(err){
              console.log(err);
            }
          })}
        >
          <label>Number of Gallons:</label>
          <input {...register("gallonsRequested", {required: 'A valid number is required.'})} type="number" placeholder="ex.  1,000" />
          <p>{errors.gallonsRequested?.message}</p>
          
          <label>Delivery Address: </label>
          <input {...register("address", {required: 'A valid address is required.'})} minLength="5" placeholder="ex.  34 wallaby way"/> 
          <p>{errors.address?.message}</p>
  
          <label>Desired Delivery Date: </label>
          <input {...register("deliveryDate", {required: 'A valid date is required.'})} type="date" minLength="5" placeholder="3/14/53"/>

          <div className = "bottomForm">
            <label>Suggested Rate: </label>
            <input {...register("suggPrice", {required: 'A valid monetary value is required.'})} placeholder="ex. 65" />
            <p>{errors.suggPrice?.message}</p>
  
            <label>Total price: </label>
            <input {...register("realPrice", {required: 'A valid monetary value is required.'})} placeholder="ex. 65" />
            <p>{errors.realPrice?.message}</p>
  
            <input type = "submit" />
          </div>

        </form>
      </div>
    </main>
  )
}
