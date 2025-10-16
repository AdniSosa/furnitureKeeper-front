import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from '../styles/AddForm.module.css';

const UpdateForm = () => {
    const { id } = useParams()
    const [payload, setPayload] = useState({
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
        favorite: "",
        comment: ""
    })

    const getFurniture = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/furniture/${id}`);

            if (!response.ok) throw new Error('No se pudo obtener la info del mueble')

            const data = await response.json();
            setPayload(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getFurniture();
    }, [])

    const editFurniture = async () => {

        if (isNaN(payload.price) || payload.price === "") {
            alert("El precio debe ser un número válido");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/furniture/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })
            if (!response.ok) throw new Error('No se pudo guardar el mueble')
            const data = response.json();
        } catch (error) {
            console.error(error)
        }
    }

    //Función para guardar la info del mueble al darle a 'guardar'
    const handleChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'depth' || name === 'width' || name === 'height') {
            setPayload({
                ...payload,
                size: {
                    ...payload.size,
                    [name]: value
                }

            })
            return;
        }
        if (name === 'favorite') {
            setPayload({ ...payload, [name]: checked })
            return
        }
        setPayload({ ...payload, [name]: value })

    }


    return (
        <>
            <h2>Edita los datos del mueble</h2>

            <form className={style.form} onSubmit={editFurniture}>
                <label htmlFor="image">Foto: </label><input type="text" placeholder="Introduce URL de la imagen" id='image' name='image' value={payload.image} onChange={handleChange} /> <br />
                <label htmlFor='name'>Nombre artículo: </label><input type="text" id='name' name='name' value={payload.name} onChange={handleChange} required /> <br />
                <label htmlFor='room'>Estancia: </label>
                <select id='room' name="room"value={payload.room} onChange={handleChange} required>

                    <option name='Dormitorio' value='Dormitorio'>Dormitorio</option>
                    <option name='Cocina' value='Cocina'>Cocina</option>
                    <option name='Recibidor' value='Recibidor'>Recibidor</option>
                    <option name='Baño' value='Baño'>Baño</option>
                    <option name='Salón' value='Salón'>Salón</option>
                    <option name='Comedor' value='Comedor'>Comedor</option>
                    <option name='Otro' value='Otro'>Otro</option>

                </select><br />
                <label>Tienda: </label><input type="text" name='store' value={payload.store} onChange={handleChange} required /><br />
                <label>Enlace a tienda: </label><input type="text" name='url' value={payload.url} onChange={handleChange} /><br />
                <label>Precio: </label><input type="text" name='price' value={payload.price} onChange={handleChange} required /><br />
                <label>Medidas (en cm): </label><br />
                <label>Ancho: </label><input type="text" name='width' value={payload.size.width} onChange={handleChange} /><br />
                <label>Alto: </label><input type="text" name='height' value={payload.size.height} onChange={handleChange} /><br />
                <label>Profundo: </label><input type="text" name='depth' value={payload.size.depth} onChange={handleChange} /><br />
                <label>Comentario: </label><input type="text" name='comment' value={payload.comment} onChange={handleChange} /><br />
                <input type="checkbox" name='favorite' checked={payload.favorite} onChange={handleChange} /><label>Guardar como favorito</label><br />

                <button type="submit">Editar artículo</button>
            </form>
        </>
    )
}

export default UpdateForm;