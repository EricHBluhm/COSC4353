import bcrypt from "bcryptjs"



export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
  
export const comparePassword = (raw, hash) => {
    return bcrypt.compareSync(raw, hash);
  }