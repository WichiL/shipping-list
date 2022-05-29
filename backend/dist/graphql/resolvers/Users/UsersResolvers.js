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
const graphql_upload_1 = require("graphql-upload");
const connection_1 = __importDefault(require("../../../database/connection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uploadAvatar_1 = require("../../../helpers/uploadAvatar");
const ShippingsListModel_1 = __importDefault(require("../../models/ShippingsList/ShippingsListModel"));
const UsersModel_1 = __importDefault(require("../../models/Users/UsersModel"));
const UsersAvatarsModel_1 = __importDefault(require("../../models/UsersAvatars/UsersAvatarsModel"));
const messageErrors = {
    userNotFound: "No se encontró este usuario",
    avatarNotFound: "No se encontró el avatar del usuario",
    defaultError: "Algo salio mal, vuelve a intentar en unos minutos",
};
const UsersResolver = {
    Upload: graphql_upload_1.GraphQLUpload,
    Query: {
        getUser: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                //RETURN INFO OF THE USER REQUESTED
                return yield UsersModel_1.default.findOne({ where: { id, is_active: true } });
            }
            catch (error) {
                return Promise.reject(Error(messageErrors.defaultError));
            }
        }),
    },
    Mutation: {
        updateUser: (_, { idUser, input }) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                const { name, first_name, last_name, avatar, email, username, password, } = input;
                //VALIDATE IF USER EXISTS
                const findUser = yield UsersModel_1.default.findOne({ where: { id: idUser } });
                if (!findUser)
                    return Promise.reject(Error(messageErrors.userNotFound));
                //UPDATE USER DATA
                yield UsersModel_1.default.update({
                    name,
                    first_name,
                    last_name,
                    email,
                    username,
                    is_active: true,
                }, { where: { id: idUser }, transaction });
                //UPDATE AVATAR IF AVATAR FROM INPUT != NULL
                if (avatar) {
                    const avatarExists = yield UsersAvatarsModel_1.default.findOne({
                        where: { is_active: true, id: findUser.id_avatar },
                    });
                    //IF AVATAR EXISTS PROCEED TO UPDATE
                    if (avatarExists) {
                        yield (0, uploadAvatar_1.UploadAvatar)({
                            file: avatar,
                            transaction: transaction,
                            idAvatar: findUser.id_avatar,
                        });
                        //DELETE THE PREVIOUS AVATAR
                        yield (0, uploadAvatar_1.DeletePreviousAvatar)({
                            previous: avatarExists.avatar_url,
                        });
                    }
                    else {
                        yield transaction.rollback();
                        return Promise.reject(Error(messageErrors.avatarNotFound));
                    }
                }
                //UPDATE THE PASSWORD IF PASSWORD FROM INPUT != NULL
                if (password) {
                    const salt = yield bcrypt_1.default.genSalt(10);
                    const newPassword = yield bcrypt_1.default.hash(password, salt);
                    yield UsersModel_1.default.update({
                        password: newPassword,
                    }, { where: { id: idUser }, transaction });
                }
                yield transaction.commit();
                return true;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(messageErrors.defaultError));
            }
        }),
    },
    UserData: {
        ShippingList: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield ShippingsListModel_1.default.findAll({
                where: { id_user: id, is_active: true },
            });
        }),
        Avatar: ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield UsersAvatarsModel_1.default.findOne({
                where: { id_user: id, is_active: true },
            });
        }),
    },
};
exports.default = UsersResolver;
