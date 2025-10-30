//Contexto para pasar room y store de un lado a otro

import { useContext, createContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({children}) => {
    const [ search, setSearch ] = useState();
    const [furnituresFound, setfurnituresFound] = useState([]);
    
    const changeSearch = (newSearch) => {
        setSearch(newSearch);
    }

    return (
        <SearchContext.Provider value={{search, changeSearch, furnituresFound, setfurnituresFound}}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => useContext(SearchContext)