import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UpdateButton from './UpdateButton';
import WhiteHeart from '../assets/CorazónBlanco.png';
import blackHeart from '../assets/CorazónNegro.png';


//*Para mostrar datos de cada artículo

const ArticleDetail = () => {
    const {_id} = useParams()
    console.log(_id)
    const [payload, setPayload] = useState({
  size: { width: "", height: "", depth: "" },
  name: "",
  price: "",
  image: "",
  store: "",
  url: "",
  room: "",
  comment: "",
  favorite: false,
  updatedAt: ""
});
    const [furniToUpdate, setFurniToUpdate] = useState({
        size: payload.size,
        name: payload.name,
        price: payload.price,
        image: payload.image,
        store: payload.store,
        url: payload.url,
        room: payload.room,
        comment: payload.comment,
        favorite: payload.favorite
    })
    const [clicked, setClicked] = useState(false);
    const [deletedMessage, setDeletedMessage] = useState('')
    const saveDate = payload.updatedAt.slice(0, 10).split('-').reverse().join('-') //Quita la hora de la fecha guardada y muestra la fecha en orden dd-mm-aaaa
    //console.log(saveDate)

    const showHeart = () => {
        if (!payload.favorite) {
            return WhiteHeart
        } else {
            return blackHeart
        }
    }

     const getFurniture = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/furniture/${_id}`);

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


    const editFavorite = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/furniture/${props.furniture._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(furniToUpdate),
                //credentials: 'include',
            });

            if (!response.ok) throw new Error("El artículo no pudo ser encontrado");

            const data = await response.json();
            setClicked(!clicked)
            props.getFurnitures();

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (clicked || !clicked)
            setFurniToUpdate({ ...furniToUpdate, favorite: !payload.favorite })
    }, [clicked])

    const deleteArticle = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_URL_API}/furniture/${props.furniture._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(furniToUpdate),
                //credentials: 'include',
            });

            if (!response.ok) throw new Error("The furniture couldn't be deleted");

            const data = await response.json();
            setDeletedMessage(`El artículo ${props.furniture.name} ha sido borrado`);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            getFurniture();
            setDeletedMessage('')
        }, 3000);
    }, [deletedMessage])



    return (
        <>
            <li key={payload._id}>
                <img src={payload.image} alt={`${payload.name}´s furniture`} width={150} />
                <img src={showHeart()} alt='heart' width={15} onClick={editFavorite} />

                <h3>{payload.name}</h3>
                <p>Precio: {payload.price}€</p>
                <p>Tienda: {payload.store}</p>
                <p>Medidas: <br />
                    {payload.size.width} cm (ancho) x {payload.size.height} cm (alto) x {payload.size.depth} cm (profundo)</p>
                <p><a href={payload.url} target="_blank">Enlace a web de la tienda</a></p>
                <p>Fecha de guardado: {saveDate}</p>
                <UpdateButton id={payload._id} />
                <button onClick={() => deleteArticle()}>Borrar</button>
            </li>
            {deletedMessage && (
                <p>{deletedMessage}</p>
            )}
        </>
    )
}

export default ArticleDetail;