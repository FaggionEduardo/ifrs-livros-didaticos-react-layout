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
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginView from 'src/views/auth';
import ListView from 'src/views/StudentsList/ListView';
import Books from 'src/views/BooksList/ListView';
import Users from 'src/views/UsersList/ListView';
import BooksCategory from 'src/views/BooksCategoryList/ListView';
import Classes from 'src/views/ClassesList/ListView';
import ClassesCreate from 'src/views/ClassesList/ListView/CreateClassesDetails';
import ClassesEdit from 'src/views/ClassesList/ListView/EditClassesDetails';
import { createBrowserHistory } from "history";
var hist = createBrowserHistory();

const App = () => {
 

  return (
    <Router>
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
            <PrivateRoute
              exact
              path="/app/users"
              component={() => <Dashboard Children={Users} />}
            />
            <PrivateRoute
              exact
              path="/app/classes"
              component={() => <Dashboard Children={Classes} />}
            />
            <PrivateRoute
              exact
              path="/app/classes/create"
              component={() => <Dashboard Children={ClassesCreate} />}
            />
            <PrivateRoute
              exact
              path="/app/classes/edit/:id"
              component={() => <Dashboard Children={ClassesEdit} />}
            />
          </Switch>
    </AuthProvider>
    </ThemeProvider>
    </Router>
  );
};

export default App;
