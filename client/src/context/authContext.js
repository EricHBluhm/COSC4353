import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    //get user from local storage, if not there, null
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    //login api call, was originally in login handleSubmit
    const login = async(inputs)=>{
        const res = await axios.post("auth/login",inputs);
        setCurrentUser(res.data)
    }

    //logout api call

    //to update whenever we change currentUser
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser))
    },[currentUser]);

    return (
        <AuthContext value = {{currentUser,login}}>
            {children}
        </AuthContext>
    );
}

