import Article from '../components/Article.jsx';
import { useState, useEffect } from 'react';
import { useSearch } from '../context/SearchContext.jsx';
import Pagination from '../components/Pagination.jsx';
import styles from '../styles/Home.module.css'

const Home = () => {
    const [furnitures, setFurnitures] = useState([])
    const { furnituresFound } = useSearch()
    const [search, setSearch] = useState('')

    const getAllFurnitures = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}`)

            if (!response.ok) throw new Error('Error al traer los datos')

            const data = await response.json();
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
            <h2>Mis muebles ♡</h2>
            {furnitures &&
                <ul className={styles.articles}>
                    {furnitures.map(furniture => (
                        <Article key={furniture._id} furniture={furniture} getFurnitures={getAllFurnitures} furnituresFound={furnituresFound} />
                    ))}
                </ul>
            }
            <Pagination totalPages={5}/>
        </>
    )
}

export default Home;