import {Link, useNavigate} from 'react-router-dom';
import { useRoom } from "../context/RoomContext";

const Home = () => {
    const navigate = useNavigate();
    const {changeRoom} = useRoom();

    const handleSelect = (e) => {
        const room = e.target.value
        if(room) {
            changeRoom(room);
            navigate(`/muebles/${room}`)
            
        }
    }

    return (
        <nav>
            <ul>
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

export default Home;