import React from "react";
import './display.css'

//eslint-disable-next-line
export default props => {
    return ( 
        <div className="display">{props.value}</div>
    )
}