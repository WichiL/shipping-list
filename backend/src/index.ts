import express from "express";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import schema from "./graphql/schemasMap";
import { graphqlUploadExpress } from "graphql-upload";
import sequelize from "./database/connection";

(async () => {
  try {
    sequelize.sync({ alter: false });
  } catch (error) {
    console.log(error);
  }
  const PORT = 4000;
  const app = express();
  const server = new ApolloServer({
    schema,
  });
  await server.start();
  app.use(graphqlUploadExpress());
  app.use("/avatars", express.static("./public/avatars"));
  server.applyMiddleware({ app, path: "/graphql" });

  const httpServer = http.createServer(app);
  httpServer.listen(PORT, () => {
    console.log("Server running...");
  });
})();
