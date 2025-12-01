import Article from '../components/Article.jsx';
import { useState, useEffect } from 'react';
import { useSearch } from '../context/SearchContext.jsx';
import Pagination from '../components/Pagination.jsx';
import styles from '../styles/Home.module.css'

const resultsPerPages = 5;

const Home = () => {
    const [furnitures, setFurnitures] = useState([])
    const { furnituresFound } = useSearch()
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(furnitures.length / resultsPerPages);

    const pagedResults = furnitures.slice((currentPage -1) * resultsPerPages, currentPage * resultsPerPages)
    console.log(pagedResults)

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

    const handlePageChange = (page) => {
        console.log('cambiando la página: ', page)
        setCurrentPage(page)
    }


    return (
        <>
            <h2>Mis muebles ♡</h2>
            {furnitures &&
                <ul className={styles.articles}>
                    {pagedResults.map(furniture => (
                        <Article key={furniture._id} furniture={furniture} getFurnitures={getAllFurnitures} furnituresFound={furnituresFound} />
                    ))}
                </ul>
            }
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>
        </>
    )
}

export default Home;