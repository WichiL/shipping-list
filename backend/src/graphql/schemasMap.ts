import "graphql-import-node";
import { makeExecutableSchema } from "graphql-tools";
import resolversMap from "./resolversMap";
import { GraphQLSchema } from "graphql";

import * as rootTypeDefs from "./schemas/root.graphql";
import * as authTypeDefs from "./schemas/Users/auth.graphql";
import * as usersTypeDefs from "./schemas/Users/users.graphql";
import * as shippingListTypeDefs from "./schemas/Shipping/shippingList.graphql";

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, authTypeDefs, usersTypeDefs, shippingListTypeDefs],
  resolvers: resolversMap,
});
export default schema;
