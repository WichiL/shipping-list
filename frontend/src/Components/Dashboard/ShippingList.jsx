import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Authentication/AuthContext";
import {
  ADD_ELEMENT,
  DELETE_ELEMENT,
} from "../../GraphqlOperations/ShippingList/ShippingList";
import { GET_USER } from "../../GraphqlOperations/Users/Users";

export const ShippingList = ({ shippingList }) => {
  const { user } = useContext(AuthContext);
  const [newElementToList, setNewElementToList] = useState();

  const [addElement] = useMutation(ADD_ELEMENT);
  const [deleteElement] = useMutation(DELETE_ELEMENT);

  const handleAddElement = async () => {
    if (!newElementToList)
      return alert(
        "Necesitas especificar cual es el nuevo elemento que deseas agregar"
      );

    try {
      await addElement({
        variables: {
          input: {
            idUser: parseInt(user.idUser),
            element: newElementToList,
          },
        },
        refetchQueries: [
          {
            query: GET_USER,
            variables: {
              getUserId: parseInt(user.idUser),
            },
          },
        ],
      });
      document.getElementById("newElement").value = "";
    } catch (error) {
      return alert(error);
    }
  };

  const handleDeleteElement = async (id) => {
    try {
      await deleteElement({
        variables: {
          idUser: parseInt(user.idUser),
          idShippingList: parseInt(id),
        },
        refetchQueries: [
          {
            query: GET_USER,
            variables: {
              getUserId: parseInt(user.idUser),
            },
          },
        ],
      });
    } catch (error) {
      return alert(error);
    }
  };

  return (
    <div>
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Nuevo insumo
        </label>
        <div className="col-sm-5">
          <input
            type="text"
            onChange={(e) => setNewElementToList(e.target.value)}
            className="form-control"
            id="newElement"
            placeholder="Agrege un nuevo insumo a la lista"
          />
        </div>
        <div className="col-sm-5">
          <button
            className="btn btn-primary"
            onClick={handleAddElement}
            type="button"
          >
            Agregar
          </button>
        </div>
      </div>
      {shippingList?.length > 0 ? (
        <ol className="list-group list-group-numbered">
          {shippingList.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{item?.element}</div>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteElement(item.id)}
              >
                Borrar
              </button>
            </li>
          ))}
        </ol>
      ) : (
        <h2>Agrega elementos a tu lista</h2>
      )}
    </div>
  );
};

export default ShippingList;
