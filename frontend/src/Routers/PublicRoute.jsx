import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

export const PublicRoute = ({
  isAuth,
  userType,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuth ? <Redirect to="/dashboard" /> : <Component {...props} />
      }
    />
  );
};

PublicRoute.prototype = {
  isAuth: PropTypes.bool.isRequired,
  userType: PropTypes.number.isRequired,
  component: PropTypes.func.isRequired,
};
