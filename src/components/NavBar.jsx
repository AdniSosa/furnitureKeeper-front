import { useRoom } from "../context/RoomContext";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logoFurni.png';
import styles from '../styles/NavBar.module.css'

const NavBar = () => {

    const navigate = useNavigate();
    const { changeRoom } = useRoom();

    const handleSelect = (e) => {
        const room = e.target.value
        if (room) {
            changeRoom(room);
            navigate(`/muebles/${room}`)

        }
    }
    return (
        <nav className={styles.navbar}>
            <ul className={styles.list}>
                <li><img src={logo} width={100} /></li>
                <li>
                    <select name='rooms-select' onChange={handleSelect}>
                        <option value=''>Estancias</option>
                        <option value='Dormitorio'>Dormitorio</option>
                        <option value='Salón'>Salón</option>
                        <option value='Comedor'>Comedor</option>
                        <option value='Recibidor'>Recibidor</option>
                        <option value='Cocina'>Cocina</option>
                        <option value='Baño'>Baño</option>
                    </select></li>
                <li>Tiendas</li>
                <li>Todo</li>
                <li>Favoritos</li>
                <li><button>Agregar</button></li>
                <li><button>Buscar</button></li>
            </ul>

        </nav>
    )
}

export default NavBar;