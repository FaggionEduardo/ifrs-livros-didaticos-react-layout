import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../providers/Auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = useAuth();
  console.log(auth)
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated ? (
          <Redirect exact to="/app/student" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
