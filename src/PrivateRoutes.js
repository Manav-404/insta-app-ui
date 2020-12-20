import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./components/Authentication/helper/authenticationHelper";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/authenticate",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoutes;
