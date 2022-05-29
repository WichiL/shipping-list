"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersModel_1 = __importDefault(require("../../models/Users/UsersModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const messageErrors = {
    userNotFound: "No se encontró este usuario",
    wrongPassword: "Usuario o contraseña incorrecta",
    defaultError: "Algo salio mal, vuelve a intentar en unos minutos",
};
const AuthResolver = {
    Mutation: {
        authUser: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { password, userName } = input;
                const userFound = yield UsersModel_1.default.findOne({
                    where: { username: userName, is_active: true },
                });
                if (!userFound) {
                    return Promise.reject(Error(messageErrors.userNotFound));
                }
                const validPass = bcrypt_1.default.compareSync(password, userFound.password);
                if (!validPass) {
                    return Promise.reject(Error(messageErrors.wrongPassword));
                }
                const token = jsonwebtoken_1.default.sign({
                    username: userName,
                    id: userFound.id,
                    name: userFound.name,
                    first_name: userFound.first_name,
                    last_name: userFound.last_name,
                    email: userFound.email,
                    id_shipping_list: userFound.id_shipping_list,
                    // avatar: avatar_url,
                }, `${process.env.SECRET_KEY}`, { expiresIn: "24h" });
                return {
                    token,
                };
            }
            catch (error) {
                return Promise.reject(Error(messageErrors.defaultError));
            }
        }),
        decryptToken: (_, { token }) => __awaiter(void 0, void 0, void 0, function* () {
            return jsonwebtoken_1.default.verify(token, `${process.env.SECRET_KEY}`);
        }),
    },
};
exports.default = AuthResolver;
