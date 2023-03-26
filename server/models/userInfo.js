import mongoose from "mongoose";

//schema object
const UserInfoSchema = new mongoose.Schema( //schema for mongoose
    {
        fullName: {
            type: String, //string
            required: true, //must be used
            min: 2, //min two values
            max: 50, //max 50
        },
        address1: {
            type: String,
            required: true,
            max: 100,
        },
        address2: {
            type: String,
            max: 100,
        },
        city: {
            type: String,
            required: true,
            max: 100,
        },
        state: {
            type: String,
            required: true,
            max: 2,
        },
        zipcode: {
            type: Number,
            required: true,
            min: 5,
            max: 9,
        },

    },
    {timestamps: true} //dates when updated/created
);

const UserInfo = mongoose.model("UserInfo", UserInfoSchema) //create mongoose schema first (above), then pass into mongoose.model, into "User" schema in database
export default UserInfo; //exports schema

//function to do user registration in server/controllers/auth.js