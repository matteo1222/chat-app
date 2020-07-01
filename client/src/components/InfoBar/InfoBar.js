import React from "react";
import './InfoBar.css';
import closeIcon from "../icons/closeIcon.png";
import onlineIcon from "../icons/onlineIcon.png";
import {Link} from "react-router-dom";


function InfoBar({room}){
    return (
        <div className="infoBar">
            <img className="onlineIcon" src={onlineIcon} alt="online"></img>
            <p className="room">{room}</p>
            <Link to={'/'}>
                <img className="closeIcon" src={closeIcon} alt="close"></img>
            </Link>
            

        </div>
    );
}


export default InfoBar;