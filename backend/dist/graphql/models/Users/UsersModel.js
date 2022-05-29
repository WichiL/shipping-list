"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../../database/connection"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: "email",
    },
    id_avatar: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    id_shipping_list: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: "users",
});
exports.default = User;
