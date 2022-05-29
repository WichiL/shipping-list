import { types } from "./types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...action.payload,
        logged: true,
      };
    case types.logout:
      return {
        logged: false,
      };
    default:
      return { state };
  }
};
