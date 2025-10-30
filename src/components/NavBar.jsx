import { useSearch } from "../context/SearchContext";
import { useState, useEffect } from "react";
import logo from '../assets/logoFurni.png';
import styles from '../styles/NavBar.module.css'
import InputSearch from "./InputSearch";
import { Link, useNavigate } from "react-router-dom";
import Select from "./Select";

const NavBar = () => {

    const navigate = useNavigate();
    const { changeSearch } = useSearch();
    const [furnitures, setFurnitures] = useState([]);
    const [stores, setStores] = useState([]);
    const [furnituresFound, setfurnituresFound] = useState([]);
    const [search, setSearch] = useState('')
    const rooms = ['Dormitorio', 'Salón', 'Comedor', 'Recibidor', 'Cocina', 'Baño', 'Otro']

    const getAllFurnitures = async () => {
        const response = await fetch(`${import.meta.env.VITE_URL_API}`)

        if (!response) throw new Error('There has been an error getting all the furnitures')

        const data = await response.json();
        setFurnitures(data);
    }

    useEffect(() => {
        getAllFurnitures()
    }, [])

    const getStores = () => {
        const allStores = []
        furnitures.forEach(furniture => {
            if (allStores.indexOf(furniture.store) === -1) allStores.push(furniture.store)

        })
        setStores(allStores)
    }


    useEffect(() => {
        if (furnitures.length > 0) getStores()
    }, [furnitures])


    const handleSelect = (e) => {
        const search = e.target.value
        if (search) {
            changeSearch(search);
            navigate(`/muebles/${search}`)
        }
    }

    const storeSelect = (e) => {
        const search = e.target.value
        if (search) {
            changeSearch(search);
            navigate(`/tiendas/${search}`)
        }
    }

    return (
        <nav className={styles.navbar}>
            <img src={logo} width={100} />
            <div className={styles.div}>
                <div>
                    <ul className={styles.list}>
                        <li><Link to={'/'}>Mis muebles</Link></li>
                        <li><Select onChange={handleSelect} name='Estancias' rooms={rooms} /></li>
                        {stores &&
                            <li>
                                <Select onChange={storeSelect} name='Tiendas' values={stores} />
                            </li>
                        }
                        <li><Link to={'/favoritos'}>Favoritos</Link></li>
                    </ul>
                </div>
                
                    <ul className={styles.buttons}>
                        <li><InputSearch /></li>
                        <li><Link to={'/agregar'}><button id="addBtn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4.929 4.929a10 10 0 1 1 14.141 14.141a10 10 0 0 1 -14.14 -14.14zm8.071 4.071a1 1 0 1 0 -2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0 -2h-2v-2z" /></svg></button></Link></li>
                    </ul>
               

            </div>

        </nav>
    )
}

export default NavBar;