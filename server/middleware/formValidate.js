
function validate(schema) {
    return async (req, res, next) => {
        try {
            const validated = await schema.validate(req.body)
            req.body = validated

            console.log("Body was Validated")
            next()
             
        } catch(err) {
            res.status(400)
            next()

        }
    }
}

export default validate;