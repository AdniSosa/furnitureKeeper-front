//Contexto para pasar room de un lado a otro

import { useContext, createContext, useState } from "react";

const RoomContext = createContext();

export const RoomProvider = ({children}) => {
    const [ room, setRoom ] = useState();
    
    const changeRoom = (newRoom) => {
        setRoom(newRoom);
    }

    return (
        <RoomContext.Provider value={{room, changeRoom}}>
            {children}
        </RoomContext.Provider>
    )
}

export const useRoom = () => useContext(RoomContext)