import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { ApolloProvider } from '@apollo/client';

import apolloClient from './services/apollo';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
