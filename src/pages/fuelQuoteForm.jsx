import './App.css'
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";



export default function App() {
  const [date, setDate] = useState(new Date());
  const { register, handleSubmit, formState: {errors} } = useForm();

  
  return (
    <main>
      <h1>
        <img src = "https://drive.google.com/thumbnail?id=1STsn8_hZ81Nlf4wNu9BFxc2_pbfSouRI" width={50} height={50} />
        Fuel Quote Form
        <img src = "https://drive.google.com/thumbnail?id=1STsn8_hZ81Nlf4wNu9BFxc2_pbfSouRI" width={50} height={50} />
      </h1>
      <p>
        Please provide us with a few details to help us get started on your quote
      </p>
      <div className = "quoteForm">
        <form 
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <label>Number of Gallons:</label>
          <input {...register("gallonsRequested", {required: 'A valid number is required.'})} type="number" placeholder="ex.  1,000" />
          <p1>{errors.gallonsRequested?.message}</p1>
          
          <label>Delivery Address: </label>
          <input {...register("address", {required: 'A valid address is required.'})} minLength="5" placeholder="ex.  34 wallaby way"/> 
          <p1>{errors.address?.message}</p1>
  
          <label>Desired Delivery Date: </label>
          <DatePicker selected={date} onChange={date => setDate(date)}/>

          <div className = "bottomForm">
            <label>Suggested Rate: </label>
            <input {...register("suggPrice", {required: 'A valid monetary value is required.'})} placeholder="ex. 65" />
            <p1>{errors.suggPrice?.message}</p1>
  
            <label>Total price: </label>
            <input {...register("realPrice", {required: 'A valid monetary value is required.'})} placeholder="ex. 65" />
            <p1>{errors.realPrice?.message}</p1>
  
            <input type = "submit" />
          </div>

        </form>
      </div>
    </main>
  )
}

