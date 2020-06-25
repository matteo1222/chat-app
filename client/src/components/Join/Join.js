import React, {useState} from "react";
import { Link } from "react-router-dom";
import './Join.css';



function Join() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <h3 className="heading">Join</h3>
            <div className="joinInnerContainer">
                <div>Name
                    <input className="joinInput" name="name" type="text" placeholder="Name" onChange={(event) => setName(event.target.value)}></input>
                </div>
                <div>Room
                    <input className="joinInput" name="room" type="text" placeholder="Room" onChange={(event) => setRoom(event.target.value)}></input>
                </div>
                <Link onClick={event => ( !name || !room ) ? event.preventDefault() : null } to={`/chat?name=${name}&room=${room}`}>
                    <button className="button">Start Chatting!</button> 
                </Link>
            </div>
        </div>
        
    );
}

export default Join;