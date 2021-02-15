import React from 'react';
import {useState} from "react"


export const TabHeader = () => {
    return(
        <tr>
            <th>Jour</th>
            <th>Cas positifs</th>
            <th>Cas au total</th>
            <th>Tranche d'age</th>
            <th>Taux de positivité</th>
            <th>Taux d'incidence</th>
            <th>Capacité analytique</th>
        </tr>
    )
}