import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { IconContext } from 'react-icons';
import 'normalize.css/normalize.css';

import 'typeface-source-sans-pro';
import '../styles/global.css';
import theme from '../styles/theme';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <IconContext.Provider value={{ className: 'react-icons' }}>
        <Component {...pageProps} />
      </IconContext.Provider>
    </ThemeProvider>
  );
};

export default App;
