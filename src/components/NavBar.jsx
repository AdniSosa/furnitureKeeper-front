import { useRoom } from "../context/RoomContext";
import {useNavigate} from 'react-router-dom';
import logo from '../assets/logoFurni.png'

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
        <nav>
            <ul>
                <li><img src={logo}/></li>
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
            </ul>
            <button>Agregar</button>
            <button>Buscar</button>
        </nav>
    )
}

export default NavBar;