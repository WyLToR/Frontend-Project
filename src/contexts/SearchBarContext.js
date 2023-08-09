import { createContext } from "react";
import { useState } from "react";

export const SearchBarContext = createContext("")

export function SearchBarProvider({ children }) {
    const [search, setSearch] = useState("")

    return (
        <SearchBarContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchBarContext.Provider>
    )
}