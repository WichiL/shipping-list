import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../../../database/connection";

interface ShippingListAttributes {
  id: number;
  id_user: number;
  element: string;
  is_active: boolean;
}

interface UserCreationAttributes
  extends Optional<ShippingListAttributes, "id"> {}

class ShippingList
  extends Model<ShippingListAttributes, UserCreationAttributes>
  implements ShippingListAttributes
{
  public id!: number;
  public id_user!: number;
  public element!: string;
  public is_active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ShippingList.init(
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
    element: {
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
    tableName: "shipping_lists",
  }
);

export default ShippingList;
