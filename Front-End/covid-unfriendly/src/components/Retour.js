import React from 'react';
import { useHistory } from 'react-router-dom';

export const Retour = (props) => {
    let history = useHistory();
    return(
        <input type="button" className="btn btn-secondary" value={ props.name === undefined ? "Retour à la page de visualisation des départements" :
        'Retour à la page de visualisation des '+ props.name }
             onClick={() => {
            history.goBack();
        }}></input>
    );
}

