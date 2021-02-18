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
          <MapFrance data={data}/>
        </div>
      </body>
      </>
    </ThemeProvider>
  );
};

export default App;
