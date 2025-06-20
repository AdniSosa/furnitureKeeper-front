import { useState } from 'react';
import WhiteHeart from '../assets/CorazónBlanco.png';
import blackHeart from '../assets/CorazónNegro.png';
import { useEffect } from 'react';

const Article = (props) => {
    const [furniToUpdate, setFurniToUpdate] = useState ({
        size: props.furniture.size,
        name: props.furniture.name,
        price:  props.furniture.price,
        image:  props.furniture.image,
        store:  props.furniture.store, 
        url:  props.furniture.url, 
        room:  props.furniture.room,
        comment:  props.furniture.comment,
        favorite:  props.furniture.favorite
    })
    const [clicked, setClicked] = useState(false)
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
        if(clicked || !clicked)
       setFurniToUpdate({ ...furniToUpdate, favorite: !props.furniture.favorite })
    }, [clicked])


    return (
        <li key={props.furniture._id}>
            <img src={props.furniture.image} alt={`${props.furniture.name}´s furniture`} width={150} />
            <img src={showHeart()} alt='heart' width={15}  onClick={editArticle}/>
    
            <h3>{props.furniture.name}</h3>
            <p>Precio: {props.furniture.price}</p>
            <p>Tienda: {props.furniture.store}</p>
            <p>Medidas: {props.furniture.size.width} (ancho) x {props.furniture.size.height} (alto) x {props.furniture.size.depth} (profundo)</p>
            <p>Fecha de guardado: {saveDate}</p>
        </li>
    )
}

export default Article;