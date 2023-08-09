import { createContext, useEffect, useState } from "react";
import { anonymLogin } from "../services/authServices";
import { loadFromLocalStorage, saveToLocalStorage } from "../services/localStorageHandler";

export const AuthContext = createContext({})

export function AuthProvider({ children }) {

    const [auth, setAuth] = useState(loadFromLocalStorage() ? loadFromLocalStorage() : {})
    
    useEffect(() => {
        if(Object.keys(auth).length === 0) {
            anonymLogin().then(data => {
                setAuth(data);
                saveToLocalStorage(data);
            })
        }
    }, [loadFromLocalStorage()])

    return (

        <AuthContext.Provider value={{ auth, setAuth }}>

            {children}

        </AuthContext.Provider>

    )

}