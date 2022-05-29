"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const AuthResolver_1 = __importDefault(require("./resolvers/Users/AuthResolver"));
const UsersResolvers_1 = __importDefault(require("./resolvers/Users/UsersResolvers"));
const ShippingListResolver_1 = __importDefault(require("./resolvers/ShippingList/ShippingListResolver"));
const resolversMap = (0, lodash_1.merge)([
    AuthResolver_1.default,
    UsersResolvers_1.default,
    ShippingListResolver_1.default,
]);
exports.default = resolversMap;
