import React from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { useDarkMode } from './components/Theme/useDarkMode';
import { lightTheme, darkTheme } from './components/Theme/theme';
import { GlobalStyles } from './global';
import Map from './components/state-vis/Map';
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
import {BarPlot} from "./components/barplot/barplot";
//import {DepartementDataTab} from "./components/dep-vis/departement-data-tab";
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />
  };

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
              <div style={{display: "inline-flex"}}>
                <Map/>
                <BarPlot/>
              </div>
            </Route>
            <Route exact path="/regions">
              <Map/>
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
