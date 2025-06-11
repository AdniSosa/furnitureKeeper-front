import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useRoom } from "../context/RoomContext";


const Furnitures = () => {
    const [furnitures, setFurnitures] = useState([]);
    const {room} = useRoom();
    const { estancia } = useParams();
    
    const getFurnitures = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/furnitures/${estancia}`);
            console.log(`${import.meta.env.VITE_URL_API}/furnitures/${estancia}`)

            if(!response.ok) throw new Error ('Error al traer los datos')

            const data = await response.json();
            console.log(data)
            setFurnitures(data);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (estancia) {
            console.log('useEffect ejecutado con estancia:', estancia);
            getFurnitures();
        }
    }, [estancia])
    
    return (
        <>
    <h2>Muebles de la estancia: {room}</h2>
            <ul>
                {furnitures.map(f => (
                    <li key={f._id}>{f.name}</li>
                ))}
            </ul>
        </>
    )
}

export default Furnitures;