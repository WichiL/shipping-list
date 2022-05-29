"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../database/connection"));
class ShippingList extends sequelize_1.Model {
}
ShippingList.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    element: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: "shipping_lists",
});
exports.default = ShippingList;
