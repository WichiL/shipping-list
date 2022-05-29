import { Resolvers } from "./generated";
import { merge } from "lodash";

import AuthResolver from "./resolvers/Users/AuthResolver";
import UsersResolver from "./resolvers/Users/UsersResolvers";
import ShippingListResolver from "./resolvers/ShippingList/ShippingListResolver";

const resolversMap: Resolvers = merge([
  AuthResolver,
  UsersResolver,
  ShippingListResolver,
]);

export default resolversMap;
