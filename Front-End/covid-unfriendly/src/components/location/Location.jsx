import Map from '../state-vis/Map'
import React from "react";
import {
    BrowserRouter as Router,
  } from "react-router-dom";



function Location(props) {

    const geo = () => {
        if(navigator.geolocation){
           navigator.geolocation.getCurrentPosition((position) => {
            props.onChange([position.coords.latitude, position.coords.longitude]); 
           });        
        } else {
           alert("La géolocalisation n'est pas supportée par le navigateur")
        }
     }

    return(
        <Router>
            <button class="location" onClick={geo}>Localisez-moi</button>
        </Router>
    );
}

export default Location;