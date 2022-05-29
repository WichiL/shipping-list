import React, { useReducer } from "react";
import { ApolloProvider } from "@apollo/client";
import { AuthContext } from "./Authentication/AuthContext";
import { authReducer } from "./Authentication/AuthReducer";
import { AppRouter } from "./Routers/AppRouter";
import client from "./config/apollo";

function App() {
  const [user, dispatch] = useReducer(authReducer, {});

  return (
    <AuthContext.Provider
      value={{
        user,
        dispatch,
      }}
    >
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

export default App;
