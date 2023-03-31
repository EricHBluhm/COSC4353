import bcrypt from "bcryptjs"



export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }
  
export const comparePassword = (raw, hash) => {
    return bcrypt.compareSync(raw, hash);
  }