import React, {useState} from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { useDarkMode } from './components/Theme/useDarkMode';
import { lightTheme, darkTheme } from './components/Theme/theme';
import { GlobalStyles } from './global';
import Map from './components/state-vis/Map';
import ToggleButtonTheme from './components/Theme/Toggle_button_theme';
import {DepartementDataTab} from './components/dep-vis/departement-data-tab';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//import {AuthContext} from './context/AuthContext/auth-context';
//import {AuthentificationForm} from './components/authentification/authentification-form/authentification-form';
import {ContactForm} from './components/contact-form/contact-form';
require('./lib/libs');
//import {DepartementDataTab} from "./components/dep-vis/departement-data-tab";

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const AuthContext = React.createContext("admin");
  const [adminCon, setAdminCon] = useState(false);

  if (!componentMounted) {
    return <div />
  };

  //Faire les Link avec des routes rest exemple : /regions#Ile de France ou /departements#Ain grace à un map sur les region puis departements
  //<Link to={"/regions"}>Regions</Link>

  return (
    <ThemeProvider theme={themeMode}>
      <div>
        <GlobalStyles />
        <div id="map">
          <h1 className="title">Bienvenue sur covid unfriendly</h1>
          <ToggleButtonTheme theme={theme} toggleTheme={toggleTheme} />
          <Router>
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
            <AuthContext.Provider value={adminCon ? 'admin' : ''} >
            <Route exact path="/contact">
              <ContactForm />
            </Route>
            </AuthContext.Provider>
            </Switch>
          </Router>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
