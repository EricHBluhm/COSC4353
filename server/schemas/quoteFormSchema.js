import * as yup from "yup"

let quoteInfoSchema = yup.object().shape({
    gallonsRequested: yup.number().required().positive(),
    address: yup.string().min(5).max(50).required(),
    deliveryDate: yup.date().required(),
    suggPrice: yup.number().required().positive(),
    realPrice: yup.number().required().positive().default(100),
    email : yup.string().min(5).max(50).required()
});


export default quoteInfoSchema