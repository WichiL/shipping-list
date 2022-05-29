import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../database/connection";

interface UsersAvatarsAttributes {
  id: number;
  id_user: number;
  avatar_url: string;
  is_active: boolean;
}

interface UsersAvatarsCreationAttributes
  extends Optional<UsersAvatarsAttributes, "id"> {}

class UsersAvatars
  extends Model<UsersAvatarsAttributes, UsersAvatarsCreationAttributes>
  implements UsersAvatarsAttributes
{
  public id!: number;
  public id_user!: number;
  public avatar_url!: string;
  public is_active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UsersAvatars.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    avatar_url: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "users_avatars",
  }
);

export default UsersAvatars;
