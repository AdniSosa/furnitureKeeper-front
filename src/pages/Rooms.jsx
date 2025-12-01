import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import Article from "../components/Article";


const Furnitures = () => {
    const [furnitures, setFurnitures] = useState([]);
    const { estancia } = useParams();

    const getFurnitures = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/furnitures/${estancia}`);

            if (!response.ok) throw new Error('Error al traer los datos')

            const data = await response.json();
            console.log(data)
            setFurnitures(data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (estancia) getFurnitures();
    }, [estancia])


    return (
        <>
            <h2>Muebles de {estancia}</h2>
            {furnitures.length === 0 ?
                <h2>No hay resultados en {estancia}</h2>
                :
                <ul>
                    {furnitures.map(furniture => (
                        <Article key={furniture._id} furniture={furniture} getFurnitures={getFurnitures} />
                    ))}
                </ul>


            }
        </>
    )
}

export default Furnitures;