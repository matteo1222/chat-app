import React, { useState } from "react";
import "./InputBar.css";
import 'emoji-mart/css/emoji-mart.css';
import {Picker} from 'emoji-mart';

function InputBar({message, setMessage, sendMessage}) {
    const [emojiPickerState, setEmojiPicker] = useState(false);
    

    let emojiPicker;
    if (emojiPickerState) {
        emojiPicker = (
            <Picker 
                onSelect={emoji => setMessage(message + emoji.native)}
                style={{ position: 'absolute', bottom: '40px', right: '10px', width: '350px', height: '420px'}}
                
            />
        );
    }

    function triggerPicker(event) {
        event.preventDefault();
        setEmojiPicker(!emojiPickerState);

    }

    

    
    
    return (
        <div>
            <form className="inputForm">
                <input 
                    className="chatInput"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(event) => {setMessage(event.target.value)}}
                    onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                />
                {emojiPicker}
                <button onClick={triggerPicker} className="emojiButton">😀</button>
                
                <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
            </form>
            
        </div>
    );
}

export default InputBar; 