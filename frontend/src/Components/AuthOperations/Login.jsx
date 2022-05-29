import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../Authentication/AuthContext";
import {
  AUTH_USER,
  DECRYPT_TOKEN,
} from "../../GraphqlOperations/Authentication/Authentication";
import { types } from "../../Authentication/types";

export const Login = () => {
  const { dispatch } = useContext(AuthContext);

  const [dataLogin, setDataLogin] = useState({
    username: null,
    password: null,
  });

  const [login] = useMutation(AUTH_USER);
  const [decryptToken] = useMutation(DECRYPT_TOKEN);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!dataLogin.username || !dataLogin.password) {
        return alert("Complete los campos solicitados");
      }
      const { data: dataToken } = await login({
        variables: {
          input: {
            userName: dataLogin.username,
            password: dataLogin.password,
          },
        },
      });

      const token = dataToken.authUser.token;
      localStorage.setItem("token", token);
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
          // avatar: decoded.avatar_url,
          name: decoded.name,
          firstname: decoded.first_name,
          lastname: decoded.last_name,
        },
      });
    } catch (error) {
      return alert(error);
    }
  };

  return (
    <div className="full-container">
      <span>Inicio de sesión</span>
      <div className="full-box" id="boxLogin">
        <form className="needs-validation" onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Usuario
            </label>
            <input
              type="text"
              onChange={(e) =>
                setDataLogin({ ...dataLogin, username: e.target.value })
              }
              className="form-control"
              id="username"
              placeholder="Ingrese usuario"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              onChange={(e) =>
                setDataLogin({ ...dataLogin, password: e.target.value })
              }
              className="form-control"
              id="password"
              placeholder="Ingrese contraseña"
            />
          </div>
          <button className="btn btn-primary right" type="submit">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
