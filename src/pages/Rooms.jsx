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
            //console.log(data)
            setFurnitures(data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (estancia) getFurnitures();
    }, [estancia])


    const editArticle = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/furnitures/${props.furniture._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(services),
                credentials: 'include',
            });

            if (!response.ok) throw new Error("La reserva no pudo ser guardada");

            const data = await response.json();

            //console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h2>Muebles de {estancia}</h2>
            {furnitures &&
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