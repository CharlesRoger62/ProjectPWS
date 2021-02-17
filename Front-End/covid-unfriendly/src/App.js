import React from 'react';
import { ThemeProvider } from 'styled-components';

import { useDarkMode } from './useDarkMode';
import { lightTheme, darkTheme } from './theme';
import { GlobalStyles } from './global';

import Toggle_button_theme from './components/Toggle_button_theme';

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />
  };

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <Toggle_button_theme theme={theme} toggleTheme={toggleTheme} />
      </>
    </ThemeProvider>
  );
};

export default App;