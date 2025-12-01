import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from '../styles/AddForm.module.css';

const AddForm = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [newFurniture, setNewFurniture] = useState({
        name: "",
        price: "",
        image: "",
        store: "",
        url: "",
        size: {
            width: "",
            height: "",
            depth: "",
        },
        room: "",
        favorite: false,
        comment: ""
    })

    const saveFurniture = async () => {

        if (isNaN(newFurniture.price) || newFurniture.price === "") {
            alert("El precio debe ser un número válido");
            return;
        }


        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/create`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newFurniture),
                })
            if (!response.ok) throw new Error('No se pudo guardar el mueble')
            const data = response.json();
            
            setMessage('El artículo ha sido guardado')
            
            setTimeout(() => {
                navigate(`/`);
            }, 2000);

        } catch (error) {
            console.error(error)
        }
    }

    //Función para guardar la info del mueble al darle a 'guardar'
    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'depth' || name === 'width' || name === 'height') {
            setNewFurniture({
                ...newFurniture,
                size: {
                    ...newFurniture.size,
                    [name]: value
                }

            })
            return;
        }
        if (name === 'favorite') {
            setNewFurniture({ ...newFurniture, [name]: checked })
            return
        }
        setNewFurniture({ ...newFurniture, [name]: value })

    }


    return (
        <>
            <h2>Agrega un nuevo mueble a tu colección</h2>

            {message && <h3>{message}</h3>}

            <form className={style.form} >
                <label htmlFor="image">Foto: </label><input type="text" placeholder="Introduce URL de la imagen" id='image' name='image' value={newFurniture.image} onChange={handleChange} /> <br />
                <label htmlFor='name'>Nombre artículo: </label><input type="text" id='name' name='name' value={newFurniture.name} onChange={handleChange} required /> <br />
                <label htmlFor='room'>Estancia: </label>
                <select id='room' name="room" value={newFurniture.room} onChange={handleChange} required>
                    <option name='Dormitorio' value='Dormitorio'>Dormitorio</option>
                    <option name='Cocina' value='Cocina'>Cocina</option>
                    <option name='Recibidor' value='Recibidor'>Recibidor</option>
                    <option name='Baño' value='Baño'>Baño</option>
                    <option name='Salón' value='Salón'>Salón</option>
                    <option name='Comedor' value='Comedor'>Comedor</option>
                    <option name='Otro' value='Otro'>Otro</option>

                </select><br />
                <label>Tienda: </label><input type="text" name='store' value={newFurniture.store} onChange={handleChange} required /><br />
                <label>Enlace a tienda: </label><input type="text" name='url' value={newFurniture.url} onChange={handleChange} /><br />
                <label>Precio: </label><input type="text" name='price' value={newFurniture.price} onChange={handleChange} required /><br />
                <label>Medidas (en cm): </label><br />
                <label>Ancho: </label><input type="text" name='width' value={newFurniture.size.width} onChange={handleChange} /><br />
                <label>Alto: </label><input type="text" name='height' value={newFurniture.size.height} onChange={handleChange} /><br />
                <label>Profundo: </label><input type="text" name='depth' value={newFurniture.size.depth} onChange={handleChange} /><br />
                <label>Comentario: </label><input type="text" name='comment' value={newFurniture.comment} onChange={handleChange} /><br />
                <input type="checkbox" name='favorite' value={newFurniture.favorite} onChange={handleChange} /><label>Guardar como favorito</label><br />

                <button onClick={saveFurniture}>Agregar artículo</button>
            </form>



        </>
    )
}

export default AddForm;