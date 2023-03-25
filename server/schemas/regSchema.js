// import { body } from 'express-validator';


// const schema =[
//     body('email')
// ]

import * as yup from "yup"

let regSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().min(3).required(),
    confirmPassword: yup.string().min(3).required(),
    hasAccInfo: yup.boolean().required(),
})

export default regSchema