const inputSearch = () => {

    const [furnituresFound, setfurnituresFound] = useState([]);
    const [search, setSearch] = useState('')

    const inputSearch = async () => {
        const response = await fetch(`${import.meta.env.VITE_URL_API}/furniture/${search}`)

        if (!response) throw new Error('There has been an error getting all the furnitures')

        const data = await response.json();
        setfurnituresFound(data);
    }

    useEffect(() => {
        inputSearch()
    }, [search])

}

export default inputSearch;