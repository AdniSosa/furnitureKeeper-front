import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateButton from './UpdateButton';
import WhiteHeart from '../assets/CorazónBlanco.png';
import blackHeart from '../assets/CorazónNegro.png';
import styles from '../styles/Article.module.css'


//*Para mostrar datos de cada artículo

const Article = (props) => {
    const navigate = useNavigate()
    const [furniToUpdate, setFurniToUpdate] = useState({
        size: props.furniture.size,
        name: props.furniture.name,
        price: props.furniture.price,
        image: props.furniture.image,
        store: props.furniture.store,
        url: props.furniture.url,
        room: props.furniture.room,
        comment: props.furniture.comment,
        favorite: props.furniture.favorite
    })
    const [clicked, setClicked] = useState(false);
    const [deletedMessage, setDeletedMessage] = useState('')
    const saveDate = props.furniture.updatedAt.slice(0, 10).split('-').reverse().join('-') //Quita la hora de la fecha guardada y muestra la fecha en orden dd-mm-aaaa
    //console.log(saveDate)

    const showHeart = () => {
        if (!props.furniture.favorite) {
            return WhiteHeart
        } else {
            return blackHeart
        }
    }

    const editArticle = async () => {
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
            //setFurniToUpdate({ ...furniToUpdate, favorite: true })
            setClicked(!clicked)
            props.getFurnitures();

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (clicked || !clicked)
            setFurniToUpdate({ ...furniToUpdate, favorite: !props.furniture.favorite })
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
            props.getFurnitures();
            setDeletedMessage('')
        }, 3000);
    }, [deletedMessage])



    return (
        <>
            <li key={props.furniture._id} className={styles.li}>
                <div>
                    <img src={props.furniture.image} alt={`${props.furniture.name}´s furniture`} width={150} />


                    <div id='buttons'>
                        <img src={showHeart()} alt='heart' width={20} height={20} onClick={editArticle} />

                        <div id='edit-button' onClick={() => navigate(`/editar/${props.furniture._id}`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path onClick={() => navigate(`/editar/${id}`)} d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" />
                            </svg>
                        </div>
                        <div id='info-button' onClick={() => navigate(`/info/${props.furniture._id}`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
                        </div>
                        <div id='edit-button' onClick={() => deleteArticle()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-square-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" /><path d="M9 9l6 6m0 -6l-6 6" /></svg>
                        </div>
                    </div>
                </div>

                <div>
                    <h3>{props.furniture.name}</h3>
                    <p>{props.furniture.store}</p>
                    <p>{props.furniture.price}€</p>
                </div>
            </li >
            {deletedMessage && (
                <p>{deletedMessage}</p>
            )
            }
        </>
    )
}

export default Article;