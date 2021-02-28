import React from 'react';
import {useState} from "react";

export const WeeksSubHeader = (props) => {
    return(
        <>
            <span className="weekheader">
                <strong>Semaine {props.count} :</strong> 
                <br/>
            </span>
        </>  
    )
}