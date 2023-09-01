import React, { createContext, useState } from "react";
import Cookies from "js-cookie";


const authContext = createContext<any>(null);

const AuthProvider = ({ children } : {children : any}) => {
    const [username, setUsername] = useState<string>(Cookies.get("username") || "");
    const login = (username : string) => {
        setUsername(username);
        Cookies.set("username", username);
    }

    const logout = () => {
        setUsername("");
        Cookies.remove("username");
    }
    return (
        <authContext.Provider value={{username,setUsername,login,logout}}>
            {children}
        </authContext.Provider>
    );
};


export { authContext, AuthProvider };
