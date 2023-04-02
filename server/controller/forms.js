
import Quote from '../models/quote.js'


export const createForm = async (req, res) =>{
    try{
        let quote = new Quote(req.body);
        console.log(quote);

        const newQuote = await quote.save(); 

        res.send("Quote Saved.");

    }catch(err){
        res.json("Error found.")
    }
}

export const getForm = (req, res) =>{
    try{
        let currentUser = req.body;
        console.log(newForm);

        const quotes = forms.filter(form=> forms.email = currentUser.email)

        res.send(quotes);

    }catch(err){
        res.json("Error found.")
    }
}