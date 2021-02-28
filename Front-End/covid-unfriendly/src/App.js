import React, {useState} from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { useDarkMode } from './components/Theme/useDarkMode';
import { lightTheme, darkTheme } from './components/Theme/theme';
import { GlobalStyles } from './global';
import Map from './components/state-vis/Map';
import Location from './components/location/Location'
import ToggleButtonTheme from './components/Theme/Toggle_button_theme';
import {DepartementDataTab} from './components/dep-vis/departement-data-tab';
import {AuthentificationForm}  from './components/authentification/authentification-form/authentification-form';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {ContactForm} from './components/contact-form/contact-form';
import { Authentification } from './components/authentification/authentification';

import {BarPlot} from "./components/barplot/barplot";
import {ChartRegions} from "./components/barplot/ChartRegions";
import {HeaderNav} from "./components/header/header";
require('./lib/libs');

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const [adminCon, setAdminCon] = useState(false);
  const [localisation, setLocalisation] = useState([0,0]);
  const [normalCon, setNormalCon] = useState(false);

  if (!componentMounted) {
    return <div />
  };

//Faire les Link avec des routes rest exemple : /regions#Ile de France ou /departements#Ain grace à un map sur les region puis departements
//<Link to={"/regions"}>Regions</Link>
  const changeAuth = () => {
    if(normalCon === false) setNormalCon(true);
    else setNormalCon(false);
  }

  const changeLocation = (coordinates) => {
    setLocalisation(coordinates);
  }

  return (
    <ThemeProvider theme={themeMode}>
      <div>
        <HeaderNav/>
        <GlobalStyles />
        <div id="map">
          <ToggleButtonTheme theme={theme} toggleTheme={toggleTheme} />
          <Router>
            <Switch>
            <Route exact path="/state">
              <Map localisation = {localisation}/>
              <ChartRegions/>
              <Location onChange={changeLocation}/>
                          </Route>
            <Route exact path="/regions">
              <Map localisation = {localisation}/>
              <Location onChange={changeLocation}/>
            </Route>
            <Route exact path="/departements">
              <DepartementDataTab />
            </Route>
            <Route exact path="/">
              <AuthentificationForm />
            </Route>
            <Route exact path="/contact">
              <ContactForm />
            </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
