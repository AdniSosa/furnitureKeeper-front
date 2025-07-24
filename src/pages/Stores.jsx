import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Article from "../components/Article";

const Stores = () => {
    const [ furnituresStore, setFurnituresStore ] = useState([])
    const { tienda } = useParams();

    const getByStores = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/stores/${tienda}`)
            if (!response.ok) throw new Error('Error getting the furnitures from the store')
            const data = await response.json();
            console.log(data)
            setFurnituresStore(data)
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        if (tienda) getByStores()
    }, [tienda])

    return (
        <>
            <h2>Muebles de {tienda}</h2>
            {furnituresStore &&
                <ul>
                    {furnituresStore.map(furniture => (
                        <Article key={furniture._id} furniture={furniture} getFurnitures={getByStores} />
                    ))}
                </ul>
            }
        </>
    )
}

export default Stores;