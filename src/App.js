import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import PrivateRoute from "./routes/PrivateRoute";
import UnPrivateRoute from "./routes/UnPrivateRoute";
import AuthProvider from "./providers/Auth";
import Dashboard from "./layouts/DashboardLayout"
import Main from "./layouts/MainLayout"
import { Router, Route, Switch } from "react-router-dom";
import LoginView from 'src/views/auth';
import AccountView from 'src/views/account/AccountView';
import ListView from 'src/views/StudentsList/ListView';
import Books from 'src/views/BooksList/ListView';
import BooksCategory from 'src/views/BooksCategoryList/ListView';
import { createBrowserHistory } from "history";
var hist = createBrowserHistory();

const App = () => {
 

  return (
    <Router history={hist}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>  
            <Switch>
            <UnPrivateRoute
             exact 
             path="/" 
             component={() => <Main Children={LoginView} />} 
             />
            <PrivateRoute
              exact
              path="/app/student"
              component={() => <Dashboard Children={ListView} />}
            />
            <PrivateRoute
              exact
              path="/app/books"
              component={() => <Dashboard Children={Books} />}
            />
            <PrivateRoute
              exact
              path="/app/category"
              component={() => <Dashboard Children={BooksCategory} />}
            />
          </Switch>
    </AuthProvider>
    </ThemeProvider>
    </Router>
  );
};

export default App;
