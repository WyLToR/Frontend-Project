import { createContext } from "react";
import { useState, useEffect } from "react";
import CRUD from "../services/CRUD";
import dataFormatter from "../utils/dataFormatter";

export const ProductsContext = createContext([])

export function ProductsProvider({ children }) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        CRUD.read("products").then(fetchedProducts => setProducts(dataFormatter(fetchedProducts)))
    }, [])

    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductsContext.Provider>
    )
}