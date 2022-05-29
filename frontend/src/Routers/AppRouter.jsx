import React, { useContext, useEffect } from "react";
import "../Styles/Global.scss";
import { Redirect, BrowserRouter as Router, Switch } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { AuthContext } from "../Authentication/AuthContext";
import { types } from "../Authentication/types";

//PUBLIC COMPONENTS
import { Login } from "../Components/AuthOperations/Login";

//PRIVATE COMPONENTS
import { Dashboard } from "../Components/Dashboard/Dashboard";

//GRAPHQL VALIDATE TOKEN
import { useMutation } from "@apollo/client";
import { DECRYPT_TOKEN } from "../GraphqlOperations/Authentication/Authentication";

export const AppRouter = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [decryptToken] = useMutation(DECRYPT_TOKEN);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const validateToken = async () => {
      try {
        const { data: tokenData } = await decryptToken({
          variables: {
            token,
          },
        });
        const decoded = tokenData.decryptToken;
        dispatch({
          type: types.login,
          payload: {
            logged: true,
            idUser: decoded.id,
            email: decoded.email,
            name: decoded.name,
          },
        });
      } catch (e) {
        sessionStorage.removeItem("token");
        dispatch({
          type: types.logout,
        });
        return <Redirect to="/login" />;
      }
    };
    if (token) {
      validateToken();
      return;
    }
    dispatch({
      type: types.logout,
    });
    return <Redirect to="/login" />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.logged]);

  return (
    <Router>
      <Switch>
        <PublicRoute
          exact
          path="/login"
          component={Login}
          isAuth={user.logged}
        />
        <PrivateRoute
          exact
          path="/dashboard"
          component={Dashboard}
          isAuth={user.logged}
        />
        <PublicRoute path="*" exact component={<div>404</div>} isAuth={true} />
      </Switch>
    </Router>
  );
};
