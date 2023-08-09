import { createContext } from "react";
import { useState } from "react";

export const CurrentPageContext = createContext("")

export function CurrentPageProvider({ children }) {
    const [currentPage, setCurrentPage] = useState("")

    return (
        <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
            {children}
        </CurrentPageContext.Provider>
    )
}