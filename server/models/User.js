import mongoose from "mongoose";

//schema object
const UserSchema = new mongoose.Schema( //schema for mongoose
    {
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true, //no duplicate emails
        },
        password: {
            type: String,
            required: true,
            min: 5,
            max: 50,
            unique: true, //no duplicate emails
        },
        userInfo: Boolean,
    },
    {timestamps: true} //dates when updated/created
);

const User = mongoose.model("User", UserSchema) //create mongoose schema first (above), then pass into mongoose.model, into "User" schema in database
export default User; //exports schema

