import React from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { useDarkMode } from './components/Theme/useDarkMode';
import { lightTheme, darkTheme } from './components/Theme/theme';
import { GlobalStyles } from './global';
import Map from './components/state-vis/Map';
import ToggleButtonTheme from './components/Theme/Toggle_button_theme';
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

  if (!componentMounted) {
    return <div />
  };


  //Faire les Link avec des routes rest exemple : /regions#Ile de France ou /departements#Ain grace à un map sur les region puis departements

  return (
    <ThemeProvider theme={themeMode}>
      <body>
        <GlobalStyles />
        <div id="map">
          <h1 className="title">Bienvenue sur covid unfriendly</h1>
          <ToggleButtonTheme theme={theme} toggleTheme={toggleTheme} />
          <Router>
          <Link to={"/regions"}>Regions</Link>
            <Switch>
            <Route exact path="/">
              <Map/>
            </Route>
            <Route exact path="/regions">
              <Map/>
            </Route>
            <Route exact path="/departements">
              <DepartementDataTab libelle={"Ain"}/>
            </Route>
            </Switch>
          </Router>
        </div>
      </body>
    </ThemeProvider>
  );
};

export default App;
