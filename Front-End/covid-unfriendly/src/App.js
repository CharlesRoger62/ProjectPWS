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
import {AuthContext} from './context/AuthContext/auth-context';
//import {AuthentificationForm} from './components/authentification/authentification-form/authentification-form';
import {ContactForm} from './components/contact-form/contact-form';
import { Authentification } from './components/authentification/authentification';
//import {ContactForm} from './components/contact-form/contact-form';
import {BarPlot} from "./components/barplot/barplot";
import {ChartRegions} from "./components/barplot/ChartRegions";
import {HeaderNav} from "./components/header/header";
//import {DepartementDataTab} from "./components/dep-vis/departement-data-tab";
require('./lib/libs');

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const AuthContext = React.createContext("admin");
  const [adminCon, setAdminCon] = useState(false);
  const [localisation, setLocalisation] = useState([0,0])

  if (!componentMounted) {
    return <div />
  };

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
            <Route exact path="/departements">
              <DepartementDataTab />
            </Route>
            <AuthContext.Provider value={adminCon ? 'admin' : ''} >
            <Route exact path="/contact">
              <ContactForm />
            </Route>
            </AuthContext.Provider>
            </Switch>
          </Router>
      </div>
      </>
    </ThemeProvider>
  );
};

export default App;
