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
import AuthentificationButton  from './components/authentification/authentification-button';
import {AuthentificationForm}  from './components/authentification/authentification-form/authentification-form';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { AuthContextForMail } from './context/AuthContext/auth-context-for-mail';
import {ContactForm} from './components/contact-form/contact-form';
import { AuthContextForTab } from './context/AuthContext/auth-context-for-tab';
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
    <ThemeProvider theme={themeMode} >
      <>
      <div style={{width:"100%"}}>
        <GlobalStyles />
        <HeaderNav/>
          <ToggleButtonTheme theme={theme} toggleTheme={toggleTheme} />
          <Router>
          <AuthentificationButton />
            <Switch>
              <Route exact path="/login">
                <AuthentificationForm />
              </Route>
            <Route exact path="/">
              <Map localisation = {localisation}/>
              <ChartRegions/>
              <Location onChange={changeLocation}/>
            </Route>
            <Route exact path="/regions">
              <Map localisation = {localisation}/>
              <Location onChange={changeLocation}/>
            </Route>
            <AuthContextForTab.Provider value={{auth: normalCon, changeAuth: changeAuth}} >
              <Route exact path="/departements">
                <DepartementDataTab />
              </Route>
            </AuthContextForTab.Provider>
            <Route exact path="/login">
              <AuthentificationForm />
            </Route>
            <AuthContextForMail.Provider value={adminCon ? 'admin' : ''} >
              <Route exact path="/contact">
                <ContactForm />
              </Route>
            </AuthContextForMail.Provider>

            </Switch>
          </Router>
      </div>
      </>
    </ThemeProvider>
  );
};

export default App;
