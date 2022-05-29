import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/client";
import { GET_USER, UPDATE_USER } from "../../GraphqlOperations/Users/Users";
import { AuthContext } from "../../Authentication/AuthContext";
import editIcon from "../../Assets/icons/edit.svg";

export const EditUser = ({ dataUser }) => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [userEdit, setUserEdit] = useState(null);
  const [changePasswordFlag, setChangePasswordFlag] = useState(false);
  const [newPreview, setNewPreview] = useState(false);

  const [updateUser] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (dataUser)
      setUserEdit({
        name: dataUser?.name,
        first_name: dataUser?.first_name,
        last_name: dataUser?.last_name,
        email: dataUser?.email,
        username: dataUser?.username,
        password: null,
        passwordConfirm: null,
        avatar: null,
      });
  }, [dataUser]);

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const {
        name,
        first_name,
        last_name,
        email,
        username,
        password,
        passwordConfirm,
        avatar,
      } = userEdit;
      if (!name || !first_name || !last_name || !email || !username) {
        return alert("Complete los campos obligatorios");
      }

      if (
        changePasswordFlag &&
        (password !== passwordConfirm || !password || !passwordConfirm)
      ) {
        return alert("Las contraseñas no coinciden");
      }
      await updateUser({
        variables: {
          idUser: parseInt(user.idUser),
          input: {
            name: name,
            first_name: first_name,
            last_name: last_name,
            email: email,
            username: username,
            password: password ? password : null,
            avatar: avatar ? avatar : null,
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
      history.push("/dashboard");
    } catch (error) {
      alert(error);
    }
  };

  const handleChangePassword = (e) => {
    setChangePasswordFlag(!changePasswordFlag);
    setUserEdit({ ...userEdit, password: null });
    document.getElementById("password").value = "";
  };

  const handleChangeImage = async (e) => {
    if (!e.target.files[0]) {
      return;
    }
    putPreview(e);
    setUserEdit({ ...userEdit, avatar: e.target.files[0] });
  };

  const handleClickEditImage = () => {
    const element = document.getElementById("avatarNew");
    element.click();
  };

  //CONVERT IMAGE TO BASE64 TO DISPLAY A PREVIEW
  const putPreview = (e) => {
    var fileToLoad = e.target.files[0];
    var fileReader = new FileReader();
    var base64File;
    fileReader.onload = function (event) {
      base64File = event.target.result;
      setNewPreview(base64File);
    };

    fileReader.readAsDataURL(fileToLoad);
  };

  return (
    <div
      className="modal fade"
      id="editUser"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="editUserLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editUserLabel">
              Editar usuario
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => history.push("/dashboard")}
              aria-label="Close"
            ></button>
          </div>
          <form className="needs-validation" onSubmit={handleUpdate} noValidate>
            <div className="modal-body">
              <div className="container-upload">
                <div className="avatar-upload">
                  <input
                    type="file"
                    hidden
                    defaultValue={userEdit?.name}
                    accept="image/*"
                    onChange={(e) => handleChangeImage(e)}
                    className="form-control"
                    id="avatarNew"
                  />

                  <label
                    htmlFor="imageUpload"
                    onClick={() => handleClickEditImage()}
                  >
                    <img
                      style={{ width: "45px" }}
                      className="btn btn-danger circle-btn"
                      src={editIcon}
                      alt="editicon"
                    ></img>
                  </label>
                </div>
                <div className="avatar-preview">
                  <img
                    src={
                      newPreview
                        ? newPreview
                        : "http://localhost:4000/avatars/" +
                          dataUser?.Avatar?.avatar_url
                    }
                    alt="avatar-upload"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nombre <b style={{ color: "red" }}>*</b>
                </label>
                <input
                  type="text"
                  defaultValue={userEdit?.name}
                  onChange={(e) =>
                    setUserEdit({ ...userEdit, name: e.target.value })
                  }
                  className="form-control"
                  id="name"
                  placeholder="Ingrese nombre"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="first_name" className="form-label">
                  Apellido Paterno <b style={{ color: "red" }}>*</b>
                </label>
                <input
                  type="text"
                  defaultValue={userEdit?.first_name}
                  onChange={(e) =>
                    setUserEdit({ ...userEdit, first_name: e.target.value })
                  }
                  className="form-control"
                  id="first_name"
                  placeholder="Ingrese apellido paterno"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="last_name" className="form-label">
                  Apellido Materno <b style={{ color: "red" }}>*</b>
                </label>
                <input
                  type="text"
                  defaultValue={userEdit?.last_name}
                  onChange={(e) =>
                    setUserEdit({ ...userEdit, last_name: e.target.value })
                  }
                  className="form-control"
                  id="last_name"
                  placeholder="Ingrese apellido materno"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email <b style={{ color: "red" }}>*</b>
                </label>
                <input
                  type="text"
                  defaultValue={userEdit?.email}
                  onChange={(e) =>
                    setUserEdit({ ...userEdit, email: e.target.value })
                  }
                  className="form-control"
                  id="email"
                  placeholder="Ingrese email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Usuario <b style={{ color: "red" }}>*</b>
                </label>
                <input
                  type="text"
                  defaultValue={userEdit?.username}
                  onChange={(e) =>
                    setUserEdit({ ...userEdit, username: e.target.value })
                  }
                  className="form-control"
                  id="username"
                  placeholder="Ingrese usuario"
                />
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="changePassword"
                  onChange={() => handleChangePassword()}
                />
                <label className="form-check-label" htmlFor="changePassword">
                  Cambiar contraseña?
                </label>
              </div>
              {changePasswordFlag && (
                <>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña <b style={{ color: "red" }}>*</b>
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setUserEdit({ ...userEdit, password: e.target.value })
                      }
                      className="form-control"
                      id="password"
                      placeholder="Ingrese contraseña"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="passwordConfirm" className="form-label">
                      Confirmar contraseña <b style={{ color: "red" }}>*</b>
                    </label>
                    <input
                      type="text"
                      onChange={(e) =>
                        setUserEdit({
                          ...userEdit,
                          passwordConfirm: e.target.value,
                        })
                      }
                      className="form-control"
                      id="passwordConfirm"
                      placeholder="Comfirme contraseña"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => history.push("/dashboard")}
              >
                Cancelar
              </button>
              <button
                type="submit"
                data-bs-dismiss="modal"
                className="btn btn-primary"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
