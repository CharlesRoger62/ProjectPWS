import React from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { useDarkMode } from './components/Theme/useDarkMode';
import { lightTheme, darkTheme } from './components/Theme/theme';
import { GlobalStyles } from './global';
import Map from './components/state-vis/Map';
import Location from './components/location/Location'
import ToggleButtonTheme from './components/Theme/Toggle_button_theme';
import { Tooltip } from "redux-tooltip";
import Moment from 'react-moment';
import 'moment-timezone';
import {useState} from "react";
import RateComponent from "./components/rate_component/RateComponent"
import {DepartementDataTab} from './components/dep-vis/departement-data-tab'
import {FranceCovidDataLoader} from './api/FranceDataLoader'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import {RegionCovidDataLoader,RegionAllDataLoader} from './api/RegionDataLoader'
import RegionEnum from './enum/RegionEnum'
import {DepartementAllDataLoader} from './api/DepartementDataLoader'

require('./lib/libs');


function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const [localisation, setLocalisation] = useState([0,0])
  const [tx_an, setTx] = useState(['chargement...'])
  const [tx_inc, setTinc] = useState(['chargement...'])
  const [tx_pos, setTpos] = useState(['chargement...'])



  /**
   * 
   * 
   * 
   * 
   * 
   */
      
      //Region que tu va récupère comme ça
      // let location = useLocation();
      // let region = location.state.regionName
      //let region = "Occitanie"

      //console.warn("Graphique région")
      //RegionAllDataLoader(RegionEnum[region]);


      //console.warn("Graphiques départements d'une certaine région")
      //DepartementAllDataLoader(RegionEnum[region])


      // Date que tu va récupérer du Datepicker 
      //let date = '2021-02-01'

      //console.warn("Taux nationaux")
      //var data = RegionCovidDataLoader(date);








  if (!componentMounted) {
    return <div />
  };

  const changeLocation = (coordinates) => {
    setLocalisation(coordinates);
  }

  return (
    <ThemeProvider theme={themeMode}>
      <div>
        <GlobalStyles />
        <div id="map">
          <h1 className="title">Bienvenue sur covid unfriendly </h1>
          <ToggleButtonTheme theme={theme} toggleTheme={toggleTheme} />
          <Router>
            <Switch>
            <Route exact path="/">
              <Map localisation = {localisation}/>
              <RateComponent></RateComponent>
              <Location onChange={changeLocation}/>
            </Route>
            <Route exact path="/regions">
              <Map localisation = {localisation}/>
              <RateComponent></RateComponent>
              <Location onChange={changeLocation}/>
            </Route>
            <Route exact path="/departements">
              <DepartementDataTab libelle={"Ain"}/>
            </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
