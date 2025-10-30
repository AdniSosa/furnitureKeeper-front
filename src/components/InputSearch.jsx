import { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

const InputSearch = () => {
    const navigate = useNavigate()
    const { setfurnituresFound, changeSearch, furnituresFound } = useSearch()
    const [search, setSearch] = useState('')

    const findFurniture = async (e) => {
        if (e) e.preventDefault()

        if (search.trim() === '') return;

        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/furniture/search `,
                {
                    method: 'POST', // Método HTTP
                    headers: {
                        'Content-Type': 'application/json', // Indicamos que el contenido es JSON
                    },
                    body: JSON.stringify({ searchInput: search }),
                })

            if (!response.ok) throw new Error('There has been an error getting the furniture')

            const data = await response.json();
            setfurnituresFound(data);
            navigate('/search')
            changeSearch(search)
            if(furnituresFound) setSearch('')
        } catch (error) {
            console.error(error)
        }

    }

    /* useEffect(() => {
        findFurniture()
    }, [search]) */

    return (
        <form onSubmit={findFurniture} action="/search">
            <input type="search" name='searchInput' value={search} onChange={(e) => setSearch(e.target.value)} />
            <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon icon-tabler icons-tabler-outline icon-tabler-home-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M21 12l-9 -9l-9 9h2v7a2 2 0 0 0 2 2h4.7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M20.2 20.2l1.8 1.8" /></svg></button>
        </form>
    )

}

export default InputSearch;