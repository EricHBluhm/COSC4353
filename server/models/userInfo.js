import mongoose from "mongoose";

//schema object
const UserInfoSchema = new mongoose.Schema( //schema for mongoose
    {
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
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
        states: {
            type: String,
            required: true,
            max: 3,
        },
        zipcode: {
            type: String,
            required: true,
            min: 5,
            max: 9,
        },

    },
);

const UserInfo = mongoose.model("UserInfo", UserInfoSchema) 
export default UserInfo; //exports schema

