import React from 'react';
import {useState} from "react";
//import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export const Retour = () => {
    return(
        <input type="button" className="btn btn-secondary" value="Retour à la page de visualisation des régions" onClick={() => {
            /*<Redirect to="/regions">
            
            </Redirect>*/
        }}></input>
    );
}