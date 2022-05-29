import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../database/connection";

interface UserAttributes {
  id: number;
  name: string;
  first_name: string;
  last_name?: string | null;
  email: string;
  username: string;
  password: string;
  id_avatar: number | null;
  id_shipping_list: number | null;
  is_active: boolean;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id_avatar" | "id_shipping_list" | "last_name"
  > {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public first_name!: string;
  public last_name?: string | null;
  public email!: string;
  public username!: string;
  public password!: string;
  public id_avatar!: number | null;
  public id_shipping_list!: number | null;
  public is_active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "email",
    },
    id_avatar: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    id_shipping_list: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
