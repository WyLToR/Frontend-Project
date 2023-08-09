import { createContext } from "react";
import { useState } from "react";

export const SearchedProductsContext = createContext([])

export function SearchedProductsProvider({ children }) {
    const [searchedProducts, setSearchedProducts] = useState([])

    return (
        <SearchedProductsContext.Provider value={{ searchedProducts, setSearchedProducts }}>
            {children}
        </SearchedProductsContext.Provider>
    )
}