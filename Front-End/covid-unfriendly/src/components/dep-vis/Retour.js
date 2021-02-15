import React from 'react';
import {useState} from "react";
import { Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export const Retour = () => {
    redirectToRegionVis = () => {
        <Redirect to="/regions">

        </Redirect>
    }

    return(
        <input type="button" className="btn btn-secondary" onClick={() => redirectToRegionVis()}>Retour à la page de visualisation des régions</input>
    );
}