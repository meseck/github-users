import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import 'normalize.css/normalize.css';

import 'typeface-source-sans-pro';
import '../styles/global.css';
import theme from '../styles/theme';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
