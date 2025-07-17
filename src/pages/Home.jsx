import Article from '../components/Article';
import NavBar from '../components/NavBar';
import { useState, useEffect } from 'react';

const Home = () => {
    const [furnitures, setFurnitures] = useState([])

    const getAllFurnitures = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}`)

            if (!response.ok) throw new Error('Error al traer los datos')

            const data = await response.json();
            console.log(data)

            setFurnitures(data)

        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        getAllFurnitures()
    }, [])

    return (
        <>
            <NavBar />

            {
                furnitures &&
                <ul>
                    {furnitures.map(furniture => (
                        <Article key={furniture._id} furniture={furniture} getFurnitures={getAllFurnitures} />
                    ))}
                </ul>
            }
        </>
    )
}

export default Home;