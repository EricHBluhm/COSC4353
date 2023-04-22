import express from "express";
//import data from "./placeHolder.json" assert { type: "json" };
import mongoose from "mongoose"
const router = express.Router();
import UserInfo from "../models/UserInfo.js"
import User from "../models/User.js";
import Quote from "../models/quote.js"

export const getUserInfo = async (req,res) =>{
    let { ID } = req.params
    //ID = ID.substring(1)
    console.log(ID)

    // //let {email} = req.body

    const foundUser = await User.findOne({email:ID}).exec(); 
        

    if(!foundUser) //if user doesn't exist
    {
            console.log("Not email for this quote request.")
            return res.status(501).json('Could not fetch the documents.')
    }
    else{
        let userInfos = await UserInfo.findOne({ email: ID} ); //check to see if user exists
    
        res.status(201);
        return res.json(userInfos); //return saved user to frontend
    }
    //return res.json("hi from formtest controller")
}

export const checkHistory = async (req,res) =>{
    let { ID } = req.params //get the id
    console.log(ID)

    // //let {email} = req.body

    const foundUser = await User.findOne({email:ID}).exec(); //check to see if user exists
    if(!foundUser) //if user doesn't exist
    {
            console.log("Not email for this quote request.")
            return res.status(501).json('Could not fetch the documents.')
    }
    else{

        let history = await Quote.findOne({ email: ID} ); //check to see if user has quote history
        let ifHistory = 0;
        if(history)
        {
            ifHistory = 0.01;
        }

        res.status(201);
        return res.json(ifHistory); //return saved user to frontend
    }
}

