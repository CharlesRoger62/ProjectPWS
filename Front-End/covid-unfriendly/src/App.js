import logo from './logo.svg';
import './App.css';
import MapFrance from './component/MapFrance'
import data from "./d3js/region.json"
import { Tooltip } from "redux-tooltip"
import {useState} from "react"
import {DepartementDataTab} from "./components/dep-vis/departement-data-tab";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <body>
        <div id="map">
          <h1>Bienvenue sur covid unfriendly</h1>
          <Router>
            <Switch>
            <Route exact path="/"> 
              <MapFrance data={data}/>
            </Route>
            <Route exact path="/regions">

            </Route>
            <Route exact path="/departements">
              <DepartementDataTab />
            </Route>
            </Switch>
          </Router>
        </div>
    </body>
  );
}

export default App;
