import React from "react";
import './Button.css';

const Button = (props) => {
    let button = "button ";
    button += props.small ? "small " : "";
    button += props.blue ? "blue " : "";
    button += props.red ? "red " : ""
    button += props.double ? "double" : "";

    return (
        <button className={button}
            onClick={e => props.click && props.click(props.label)}>
            {props.label}
        </button>
    );
}

export default Button;