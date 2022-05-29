import React, { useContext, useEffect, useState } from "react";
import { types } from "../../Authentication/types";
import { useApolloClient, useQuery } from "@apollo/client";
import { AuthContext } from "../../Authentication/AuthContext";
import { GET_USER } from "../../GraphqlOperations/Users/Users";

import ShippingList from "./ShippingList";
import EditUser from "./EditUser";

export const Dashboard = () => {
  const { user, dispatch } = useContext(AuthContext);
  const client = useApolloClient();
  const [dataUser, setDataUser] = useState();

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      getUserId: parseInt(user.idUser),
    },
  });

  useEffect(() => {
    if (!loading) {
      if (error) return alert(error);

      setDataUser(data?.getUser);
    }
  }, [data, loading, error]);

  const handleLogout = () => {
    try {
      client.clearStore();
      localStorage.removeItem("token");
      sessionStorage.removeItem("user");

      setTimeout(() => {
        dispatch({
          type: types.logout,
        });
      }, 200);
    } catch (error) {
      alert("Ocurrio un error");
    }
  };
  return (
    <>
      <EditUser dataUser={data?.getUser} />
      <div className="layout-align">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-header header-user">
                <h3>Datos de usuario</h3>
                <button className="btn btn-info" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
              <div className="card-body">
                <div className="container-card-data">
                  <div className="user-pic">
                    <img
                      className="fit-img"
                      src={
                        "http://localhost:4000/avatars/" +
                        dataUser?.Avatar?.avatar_url
                      }
                      alt="avatar"
                    ></img>
                  </div>
                  <div className="user-data">
                    <span>Nombre:</span>
                    <h5> {dataUser?.name}</h5>
                    <span>Apellidos:</span>
                    <h5>{dataUser?.first_name + " " + dataUser?.last_name}</h5>
                    <span>Email:</span>
                    <h5>{dataUser?.email}</h5>
                    <span>Usuario:</span>
                    <h5>{dataUser?.username} </h5>
                    <button
                      className="btn btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#editUser"
                    >
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="card shipping-list">
              <div className="card-header">
                <h3>Lista de compras</h3>
              </div>
              <div className="card-body">
                <ShippingList shippingList={dataUser?.ShippingList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
