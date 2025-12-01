import { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateButton from '../components/UpdateButton';
import WhiteHeart from '../assets/CorazónBlanco.png';
import blackHeart from '../assets/CorazónNegro.png';
import styles from '../styles/FurnitureDetails.module.css'

//*Para mostrar datos de cada artículo

const FurnitureDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    console.log(id)
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
        const question = window.confirm('¿Estás seguro de que quieres borrar este artículo?');

        if (question) {

            try {
                const response = await fetch(`${import.meta.env.VITE_URL_API}/furniture/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(furniToUpdate),
                    //credentials: 'include',
                });

                if (!response.ok) throw new Error("The furniture couldn't be deleted");

                const data = await response.json();
                setDeletedMessage(`El artículo ${payload.name} ha sido borrado`);
                navigate('/')
            } catch (error) {
                console.error(error);
            }
        }
    }


    return (
        <div className={styles.li}>

            <img src={payload.image} alt={`${payload.name}´s furniture`} width={150} />
            <div className={styles.details}>
                <div className={styles.description}>
                    <h3>{payload.name}</h3>
                    <div style={{ display: 'inline-block' }}><p style={{ display: 'inline-block', marginRight: '10px' }}><strong>Guardado como favorito:</strong></p>{payload.favorite ? <p style={{ display: 'inline-block', marginRight: '5px' }}>Sí</p> : <p style={{ display: 'inline-block' }}>No</p>}<img src={showHeart()} alt='heart' width={15} onClick={editFavorite} /></div>
                    <p><strong>Precio:</strong> {payload.price}€</p>
                    <p><strong>Tienda: </strong>{payload.store}</p>
                    <p><strong>Medidas: </strong>{payload.size.width} cm (ancho) x {payload.size.height} cm (alto) x {payload.size.depth} cm (profundo)</p>
                    <p><strong>Comentario: </strong>{payload.comment}</p>
                    <p><strong>Fecha de guardado: </strong>{saveDate}</p>
                    <p><a href={payload.url} target="_blank">Enlace a web de la tienda</a></p>
                </div>
                <div className={styles.buttons}>
                    <UpdateButton id={payload._id} />
                    <button onClick={() => deleteArticle()}>Borrar</button>
                </div>
            </div>
        </div>
    )
}

export default FurnitureDetails;