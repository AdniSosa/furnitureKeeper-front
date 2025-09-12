import { useState, useEffect } from "react";
import Article from "../components/Article";

const Favorites = () => {
    const [furnituresFavorites, setFurnituresFavorites] = useState([])

    const getFavorites = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/favorites`)
            if (!response.ok) throw new Error('Error getting the favorite furnitures')
            const data = await response.json();
            console.log(data)
            setFurnituresFavorites(data)
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        getFavorites()
    }, [])

    return (
        <>
            <h2>Mis favoritos ♡</h2>
            {furnituresFavorites &&
                <ul>
                    {furnituresFavorites.map(furniture => (
                        <Article key={furniture._id} furniture={furniture} getFurnitures={getFavorites} />
                    ))}
                </ul>
            }
        </>
    )
}

export default Favorites;