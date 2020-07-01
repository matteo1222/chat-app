import React, {useEffect, useState} from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import InputBar from "../InputBar/InputBar";
import Messages from "../Messages/Messages";
import ScrollToBottom from "react-scroll-to-bottom";
import './Chat.css';

let socket;

function Chat( {location} ) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);


    const ENDPOINT = 'https://react-chat-application-po.herokuapp.com/';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT);
        setName(name);
        setRoom(room);
        
        socket.emit('join', {name, room}, (error) => {
            if(error) {
                alert(error);
            }
        });

        return () => {
            socket.emit('disconnect');
            socket.off();

        };

    }, [ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            const time1 = Date.now();
            
            setMessages([...messages, message]);
            const time2 = Date.now();
            console.log(time2 - time1);
        });

        return function removeEventListener() {
            socket.off('message');
        };

    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    };






    return (
        <div className="chatOuterContainer">
            <InfoBar room={room} />
            <ScrollToBottom className="scrollToBottom">
                <div className="chatInnerContainer">
                    <Messages messages={messages} name={name} />
                    
                </div>
            </ScrollToBottom>
            <InputBar 
                message={message} 
                setMessage={setMessage} 
                sendMessage={sendMessage} 
            />
        </div>
        
    );
}

export default Chat;