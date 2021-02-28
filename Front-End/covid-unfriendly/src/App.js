import React, {useState} from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import { useDarkMode } from './components/Theme/useDarkMode';
import { lightTheme, darkTheme } from './components/Theme/theme';
import { GlobalStyles } from './global';
import Map from './components/state-vis/Map';
import ToggleButtonTheme from './components/Theme/Toggle_button_theme';
import {DepartementDataTab} from './components/dep-vis/departement-data-tab';
import AuthentificationButton from './components/authentification/authentification-button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
<<<<<<< Updated upstream
import {AuthContext} from './context/AuthContext/auth-context';
import {AuthentificationForm} from './components/authentification/authentification-form/authentification-form';
//import {ContactForm} from './components/contact-form/contact-form';
=======
import { AuthContextForMail } from './context/AuthContext/auth-context-for-mail';
import {ContactForm} from './components/contact-form/contact-form';
import { AuthContextForTab } from './context/AuthContext/auth-context-for-tab';
import { Authentification } from './components/authentification/authentification';
>>>>>>> Stashed changes
require('./lib/libs');

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  const [adminCon, setAdminCon] = useState(false);
<<<<<<< Updated upstream
=======
  const [localisation, setLocalisation] = useState([0,0]);
  const [normalCon, setNormalCon] = useState(false);
>>>>>>> Stashed changes

  if (!componentMounted) {
    return <div />
  };

<<<<<<< Updated upstream
  //Faire les Link avec des routes rest exemple : /regions#Ile de France ou /departements#Ain grace à un map sur les region puis departements
  //<Link to={"/regions"}>Regions</Link>
=======
  const changeAuth = () => {
    if(normalCon === false) setNormalCon(true);
    else setNormalCon(false);
  }

  const changeLocation = (coordinates) => {
    setLocalisation(coordinates);
  }
>>>>>>> Stashed changes

  return (
    <ThemeProvider theme={themeMode}>
      <div>
        <GlobalStyles />
        <div id="map">
          <h1 className="title">Bienvenue sur covid unfriendly</h1>
          <ToggleButtonTheme theme={theme} toggleTheme={toggleTheme} />
          <Router>
          <AuthentificationButton />
            <Switch>
            <Route exact path="/">
              <Map/>
            </Route>
            <Route exact path="/regions">
              <Map/>
            </Route>
<<<<<<< Updated upstream
            <Route exact path="/departements">
              <DepartementDataTab libelle={"Ain"}/>
            </Route>
            <AuthContext.Provider value={adminCon ? 'admin' : ''} >
=======
            <AuthContextForTab.Provider value={{auth: normalCon, changeAuth: changeAuth}} >
              <Route exact path="/departements">
                <DepartementDataTab />
              </Route>
            </AuthContextForTab.Provider>
>>>>>>> Stashed changes
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
      </div>
    </ThemeProvider>
  );
};

export default App;
