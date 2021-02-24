import React from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { useDarkMode } from './components/Theme/useDarkMode';
import { lightTheme, darkTheme } from './components/Theme/theme';
import { GlobalStyles } from './global';
import Map from './components/state-vis/Map';
import Location from './components/location/Location'
import Toggle_button_theme from './components/Theme/Toggle_button_theme';
import { Tooltip } from "redux-tooltip";
import {useState} from "react";
import {DepartementDataTab} from './components/dep-vis/departement-data-tab'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//import {DepartementDataTab} from "./components/dep-vis/departement-data-tab";
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const [localisation, setLocalisation] = useState([0,0])

  if (!componentMounted) {
    return <div />
  };

  const changeLocation = (coordinates) => {
    setLocalisation(coordinates);
  }

  return (
    <ThemeProvider theme={themeMode}>
      <body>
        <GlobalStyles />
        <div id="map">
          <h1 className="title">Bienvenue sur covid unfriendly</h1>
          <Toggle_button_theme theme={theme} toggleTheme={toggleTheme} />
          <Router>
            <Switch>
            <Route exact path="/">
              <Map localisation = {localisation}/>
              <Location onChange={changeLocation}/>
            </Route>
            <Route exact path="/regions">
              <Map localisation = {localisation}/>
              <Location onChange={changeLocation}/>
            </Route>
            <Route exact path="/departements">
              <DepartementDataTab />
            </Route>
            </Switch>
          </Router>
        </div>
      </body>
    </ThemeProvider>
  );
};

export default App;
