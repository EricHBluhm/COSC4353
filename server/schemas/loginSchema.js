import * as yup from "yup"

let loginSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().min(3).required(),
})

export default loginSchema