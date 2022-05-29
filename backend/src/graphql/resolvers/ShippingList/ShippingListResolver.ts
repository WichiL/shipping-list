import sequelize from "../../../database/connection";
import { Resolvers } from "../../generated";
import ShippingListModel from "../../models/ShippingsList/ShippingsListModel";

const messageErrors = {
  defaultError: "Algo salio mal, vuelve a intentar en unos minutos",
};

const ShippingListResolver: Resolvers = {
  Mutation: {
    addElementToShippingList: async (_, { input }) => {
      const transaction = await sequelize.transaction();
      try {
        const { element, idUser } = input;
        await ShippingListModel.create(
          {
            id_user: idUser,
            element: element,
            is_active: true,
          },
          { transaction }
        );
        await transaction.commit();
        return true;
      } catch (error) {
        await transaction.rollback();
        return Promise.reject(Error(messageErrors.defaultError));
      }
    },

    deleteElementFromShippingList: async (_, { idShippingList, idUser }) => {
      const transaction = await sequelize.transaction();
      try {
        await ShippingListModel.update(
          {
            is_active: false,
          },
          {
            where: { id_user: idUser, id: idShippingList },
            transaction,
          }
        );
        await transaction.commit();
        return true;
      } catch (error) {
        await transaction.rollback();
        return Promise.reject(Error(messageErrors.defaultError));
      }
    },
  },
};

export default ShippingListResolver;
