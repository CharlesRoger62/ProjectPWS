import React from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { useDarkMode } from './useDarkMode';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';
import MapFrance from './component/MapFrance'
import data from "./d3js/region.json"
import Toggle_button_theme from './components/Toggle_button_theme';
import { Tooltip } from "redux-tooltip"
import {useState} from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//import {DepartementDataTab} from "./components/dep-vis/departement-data-tab";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />
  };

  return (
    <ThemeProvider theme={themeMode}>
      <>
      <body>
        <GlobalStyles />
        <Toggle_button_theme theme={theme} toggleTheme={toggleTheme} />
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
      </>
    </ThemeProvider>
  );
};

export default App;
