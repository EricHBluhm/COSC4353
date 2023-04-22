import * as yup from "yup"

let quoteInfoSchema = yup.object().shape({
    gallonsRequested: yup.number().required().positive(),
    address: yup.string().min(5).max(400).required(),
    deliveryDate: yup.date().required(),
    suggPrice: yup.number().required().positive(),
    realPrice: yup.number().required().positive(),
    email : yup.string().min(5).max(50).required()
});


export default quoteInfoSchema