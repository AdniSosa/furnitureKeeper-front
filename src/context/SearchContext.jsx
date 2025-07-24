//Contexto para pasar room de un lado a otro

import { useContext, createContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({children}) => {
    const [ search, setSearch ] = useState();
    
    const changeSearch = (newSearch) => {
        setSearch(newSearch);
    }

    return (
        <SearchContext.Provider value={{search, changeSearch}}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => useContext(SearchContext)