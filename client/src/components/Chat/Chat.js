import React, {useEffect, useState} from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

function Chat( {location} ) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        

    }, [ENDPOINT, location.search]);



    return (
        <div>
            <h3>Chat</h3>
            <p>{name}</p>
            <p>{room}</p>
        </div>
    );
}

export default Chat;