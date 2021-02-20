import React from 'react';
import {useState} from "react";


export const RowData = (props) => {
    if (props.value!==undefined){
        return (
            <>
                <td>{props.value.date}</td>
                <td>{props.value. nbtest_positif}</td>
                <td>{props.value.nbtest}</td>
                <td>tranche d'age ...</td>
                <td>{props.value.tx_pos}</td>
                <td>{props.value.tx_inc}</td>
                <td>{props.value.tx_an}</td>
            </> 
        );
    }
    else
    return(
        <>
            <td>d</td>
            <td>d</td>
            <td>d</td>
            <td>d</td>
            <td>d</td>
            <td>d</td>
            <td>d</td>
        </>
    );
}