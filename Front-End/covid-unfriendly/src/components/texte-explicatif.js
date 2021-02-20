import React from 'react';

export default TexteExplicatif = () =>{
    return (
        <p>
            -Le taux d'incidence correspond au nombre de tests positifs pour 100.000 habitants.
             Il est calculé de la manière suivante : (100000 * nombre de cas positif) / Population <br />
            -Le taux de positivité correspond au nombre de tests positifs rapportés au nombre de tests réalisés.
             Il est calculé de correspond au nombre de tests réalisés, qu'il soient positifs ou négatifs, pour 100.000 habitants.
            Elle est calculé de la manière s la manière suivante : 100*nombre de test positif/ nombre de tests réalisés <br />
            -La capacité analytiqueuivante : (100000*nombre de test réalisés)/ Population
        </p>
    )
}
