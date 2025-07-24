import { useState, useEffect } from "react";

const AddForm = () => {
    const [newFurnitures, setNewFurnitures] = useState({
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

    const saveFurniture = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/furniture/${props.furniture._id}`,
                {
                    method: POST,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newFurnitures),
                })
            if (!response.ok) throw new Error('No se pudo guardar el mueble')
            const data = response.json();
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            <h2>Agrega un nuevo mueble a tu colección</h2>

            <label>Foto: </label><input type="text" placeholder="Introduce URL de la imagen" />
            <label>Nombre artículo: </label><input type="text" />
            <label>Tienda: </label><input type="text" />
            <label>Precio: </label><input type="text" />
            <label>Medidas (en cm): </label><br />
            <label>Ancho: </label><input type="text" />
            <label>Alto: </label><input type="text" />
            <label>Profundo: </label><input type="text" />
            <label>Comentario: </label><input type="text" />
            <input type="checkbox" /><label>Guardar como favorito</label>

            <button>Agregar artículo</button>
        </>
    )
}

export default AddForm;