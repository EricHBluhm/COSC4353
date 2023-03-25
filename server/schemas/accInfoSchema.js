import * as yup from "yup"

let accInfoSchema = yup.object().shape({
    fullName: yup.string().max(50).required(),
    address1: yup.string().min(3).max(100).required(),
    address2: yup.string().min(3).max(100),
    city: yup.string().max(100).required(),
    zipcode: yup.string().min(5).max(9).required(),
    states: yup.string().max(2).required(),
})

export default accInfoSchema