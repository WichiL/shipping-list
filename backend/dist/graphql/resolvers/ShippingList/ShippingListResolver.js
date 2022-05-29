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
const connection_1 = __importDefault(require("../../../database/connection"));
const ShippingsListModel_1 = __importDefault(require("../../models/ShippingsList/ShippingsListModel"));
const messageErrors = {
    defaultError: "Algo salio mal, vuelve a intentar en unos minutos",
};
const ShippingListResolver = {
    Mutation: {
        addElementToShippingList: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                const { element, idUser } = input;
                yield ShippingsListModel_1.default.create({
                    id_user: idUser,
                    element: element,
                    is_active: true,
                }, { transaction });
                yield transaction.commit();
                return true;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(messageErrors.defaultError));
            }
        }),
        deleteElementFromShippingList: (_, { idShippingList, idUser }) => __awaiter(void 0, void 0, void 0, function* () {
            const transaction = yield connection_1.default.transaction();
            try {
                yield ShippingsListModel_1.default.update({
                    is_active: false,
                }, {
                    where: { id_user: idUser, id: idShippingList },
                    transaction,
                });
                yield transaction.commit();
                return true;
            }
            catch (error) {
                yield transaction.rollback();
                return Promise.reject(Error(messageErrors.defaultError));
            }
        }),
    },
};
exports.default = ShippingListResolver;
