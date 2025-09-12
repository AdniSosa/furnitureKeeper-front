
const Select = (props) => {
    const rooms = props.rooms;
    const values = props.values
    
    return (
        <>
        <label htmlFor={props.name}>{props.name}</label>
        <select id={props.name} name={props.name} onChange={props.onChange} width={10}>
            {rooms &&
                rooms.map(room => (
                    <option key={room} value={room}>{room}</option>
                ))
            }
            {values && 
                values.map(value => (
                    <option key={value} value={value}>{value}</option>
                ))
            }
        </select>
        </>
    )
}

export default Select;