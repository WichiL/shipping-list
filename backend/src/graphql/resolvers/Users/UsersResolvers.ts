import { GraphQLUpload } from "graphql-upload";
import { Resolvers } from "../../generated";
import sequelize from "../../../database/connection";
import bcrypt from "bcrypt";
import {
  UploadAvatar,
  DeletePreviousAvatar,
} from "../../../helpers/uploadAvatar";
import ShippingListModel from "../../models/ShippingsList/ShippingsListModel";
import UserModel from "../../models/Users/UsersModel";
import UsersAvatarsModel from "../../models/UsersAvatars/UsersAvatarsModel";

const messageErrors = {
  userNotFound: "No se encontró este usuario",
  avatarNotFound: "No se encontró el avatar del usuario",
  defaultError: "Algo salio mal, vuelve a intentar en unos minutos",
};

const UsersResolver: Resolvers = {
  Upload: GraphQLUpload,
  Query: {
    getUser: async (_, { id }) => {
      try {
        //RETURN INFO OF THE USER REQUESTED
        return await UserModel.findOne({ where: { id, is_active: true } });
      } catch (error) {
        return Promise.reject(Error(messageErrors.defaultError));
      }
    },
  },
  Mutation: {
    updateUser: async (_, { idUser, input }) => {
      const transaction = await sequelize.transaction();
      try {
        const {
          name,
          first_name,
          last_name,
          avatar,
          email,
          username,
          password,
        } = input;

        //VALIDATE IF USER EXISTS
        const findUser = await UserModel.findOne({ where: { id: idUser } });
        if (!findUser) return Promise.reject(Error(messageErrors.userNotFound));

        //UPDATE USER DATA
        await UserModel.update(
          {
            name,
            first_name,
            last_name,
            email,
            username,
            is_active: true,
          },
          { where: { id: idUser }, transaction }
        );

        //UPDATE AVATAR IF AVATAR FROM INPUT != NULL
        if (avatar) {
          const avatarExists = await UsersAvatarsModel.findOne({
            where: { is_active: true, id: findUser.id_avatar },
          });

          //IF AVATAR EXISTS PROCEED TO UPDATE
          if (avatarExists) {
            await UploadAvatar({
              file: avatar,
              transaction: transaction,
              idAvatar: findUser.id_avatar,
            });

            //DELETE THE PREVIOUS AVATAR
            await DeletePreviousAvatar({
              previous: avatarExists.avatar_url,
            });
          } else {
            await transaction.rollback();
            return Promise.reject(Error(messageErrors.avatarNotFound));
          }
        }

        //UPDATE THE PASSWORD IF PASSWORD FROM INPUT != NULL
        if (password) {
          const salt = await bcrypt.genSalt(10);
          const newPassword = await bcrypt.hash(password, salt);
          await UserModel.update(
            {
              password: newPassword,
            },
            { where: { id: idUser }, transaction }
          );
        }

        await transaction.commit();
        return true;
      } catch (error) {
        await transaction.rollback();
        return Promise.reject(Error(messageErrors.defaultError));
      }
    },
  },
  UserData: {
    ShippingList: async ({ id }) => {
      return await ShippingListModel.findAll({
        where: { id_user: id, is_active: true },
      });
    },
    Avatar: async ({ id }) => {
      return await UsersAvatarsModel.findOne({
        where: { id_user: id, is_active: true },
      });
    },
  },
};

export default UsersResolver;
