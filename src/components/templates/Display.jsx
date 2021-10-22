import React from "react";
import './Display.css';

const Display = props => {
    return (
        <div className="display">
            <span>{props.value}</span>
        </div>
    );
}


export default Display;