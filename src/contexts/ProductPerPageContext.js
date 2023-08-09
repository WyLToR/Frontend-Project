import { createContext } from "react";
import { useState } from "react";

export const ProductPerPageContext = createContext(9)

export function ProductPerPageProvider({ children }) {
    const [productPerPage] = useState(9)

    return (
        <ProductPerPageContext.Provider value={{ productPerPage }}>
            {children}
        </ProductPerPageContext.Provider>
    )
} 