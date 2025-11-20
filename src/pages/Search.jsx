import Article from '../components/Article';
import { useSearch } from '../context/SearchContext';

const Search = () => {
    const { furnituresFound, search } = useSearch();

   if (furnituresFound.length === 0) return <h2>No hay resultados para esta busqueda: <u>{search}</u></h2> //setMessage('No hay resultados para esta busqueda')


    return (
        <>
            <h2>Resultados para: {search}</h2>
            {furnituresFound &&
                <ul>
                    {furnituresFound.map(furniture => (
                        <Article key={furniture._id} furniture={furniture} />
                    ))}
                </ul>
            }

        </>
    )
}

export default Search;