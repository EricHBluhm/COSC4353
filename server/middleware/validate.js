

function validate(schema) {
  return async (req, res, next) => {
    try {
      const validatedBody = await schema.validate(req.body);
      // replace request body with validated schema object
      // so that default values are applied to the DTO
      req.body = validatedBody;
      console.log("Validation complete")
      next();
    } catch (err) {
      console.log("that aint right")
      next();
    }
  };
}

export default validate;
