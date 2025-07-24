
const Select = (props) => {
    const rooms = props.rooms;
    const values = props.values
    
    return (

        <select name={props.name} onChange={props.onChange}>
            <option value=''>{props.selectName}</option>
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
    )
}

export default Select;