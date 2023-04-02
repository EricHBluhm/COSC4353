
import { string } from 'yup';
import Quote from '../models/quote.js'


export const createForm = async (req, res) =>{
    try{
        let quote = new Quote(req.body);
        console.log(quote);

        const newQuote = await quote.save(); 

        res.send({ response : 'Quote Saved.' });

    }catch(err){
        res.json("Error found.")
    }
}
