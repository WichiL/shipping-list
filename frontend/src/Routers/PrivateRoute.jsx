import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../Authentication/AuthContext";
import { types } from "../Authentication/types";

export const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
  const { dispatch } = useContext(AuthContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch({
        type: types.logout,
      });
      return <Redirect to="/login" />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Route
      {...rest}
      component={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

PrivateRoute.prototype = {
  isAuth: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
