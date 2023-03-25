
let forms = [{
    gallonsRequested: "45",
    address: "123 Wallaby Way",
    suggPrice: "435",
    deliveryDate: "03/15/2023",
    realPrice: "100"
}]

export const createForm = (req, res) =>{
    try{
        let newForm = req.body;
        console.log(newForm);

        res.send({formID: 1});

    }catch(err){
        res.json("Error found.")
    }
}