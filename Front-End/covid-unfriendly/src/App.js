import logo from './logo.svg';
import './App.css';
import {DepartementDataTab} from './components/dep-vis/departement-data-tab'
import data from "./d3js/region.json"
import { Tooltip } from "redux-tooltip"
import {useState} from "react"



function App() {
  return (
    <body>
      <div id="map">
        <h1>Bienvenue sur covid unfriendly</h1>
        <DepartementDataTab name="mocked"></DepartementDataTab>
      </div>
    </body>
  );
}

export default App;
