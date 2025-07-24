import { useSearch } from "../context/SearchContext";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import logo from '../assets/logoFurni.png';
import styles from '../styles/NavBar.module.css'
import { Link } from "react-router-dom";
import Select from "./Select";

const NavBar = () => {

    const navigate = useNavigate();
    const { changeSearch } = useSearch();
    const [furnitures, setFurnitures] = useState([]);
    const [stores, setStores] = useState([])
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
            <ul className={styles.list}>
                <li><img src={logo} width={100} /></li>
                <li><Select onChange={handleSelect} name={'rooms-select'} rooms={rooms} selectName={'Estancias'} /></li>
                {stores &&
                    <li>
                        <Select onChange={storeSelect} name={'store-select'} values={stores} selectName={'Tiendas'} />
                    </li>
                }
                <li><Link to={'/'}>Todos</Link></li>
                <li><Link to={'/favoritos'}>Favoritos</Link></li>
                <li><Link to={'/agregar'}><button id="addBtn">Agregar</button></Link></li>
                <li><input type="search"/><input type="button" className="searchBtn" value="Buscar"/></li>
            </ul>

        </nav>
    )
}

export default NavBar;