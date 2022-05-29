import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";

const httpLink = createUploadLink({
  uri: "http://127.0.0.1:4000/graphql", //LOCALHOST
  // uri: "http://34.236.150.231/graphql", //PROD
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache({ addTypename: false }),
  link: authLink.concat(httpLink),
});

export default client;
