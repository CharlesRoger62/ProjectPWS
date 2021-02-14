import logo from './logo.svg';
import './App.css';
import MapFrance from './component/MapFrance'
import data from "./d3js/departement.json"
import { Tooltip } from "redux-tooltip"
import {useState} from "react"



function App() {

  return (
    <body>
      <div id="map">
        <h1>Bienvenue sur covid unfriendly</h1>
        <MapFrance data={data}/>
      </div>
    </body>
  );
}

export default App;
