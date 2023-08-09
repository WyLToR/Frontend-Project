import { createContext, useContext, useEffect, useState } from "react";
import CRUD from "../services/CRUD";
import cartFormatter from "../utils/cartFormatter";
import { AuthContext } from "./AuthContext";
import { loadFromLocalStorage } from "../services/localStorageHandler";

export const cartContext = createContext([])

export const CartContextProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    const { auth } = useContext(AuthContext);
    const path = auth.email ? "users" : "anon";
    useEffect(() => {
            CRUD.read(`${path}/${auth.id}/cart`)
            .then(data => setCart(cartFormatter(data)))
    }, [auth])

    return (
        <cartContext.Provider value={{ cart, setCart }}>
            {children}
        </cartContext.Provider>
    )

}