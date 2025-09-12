import { useNavigate } from "react-router-dom"

const UpdateButton = ({id}) => {
    const navigate = useNavigate();

    return (
        <>
        <button onClick={() => navigate(`/editar/${id}`)}>Editar</button>
        </>
    )
}

export default UpdateButton;