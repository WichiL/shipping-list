import { Resolvers } from "../../generated";
import User from "../../models/Users/UsersModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const messageErrors = {
  userNotFound: "No se encontró este usuario",
  wrongPassword: "Usuario o contraseña incorrecta",
  defaultError: "Algo salio mal, vuelve a intentar en unos minutos",
};

interface tokenDecrypted {
  id: number;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  id_shopping_cart: number;
  // avatar: string;
  iat: number;
  exp: number;
}

const AuthResolver: Resolvers = {
  Mutation: {
    authUser: async (_, { input }) => {
      try {
        const { password, userName } = input;

        const userFound = await User.findOne({
          where: { username: userName, is_active: true },
        });
        if (!userFound) {
          return Promise.reject(Error(messageErrors.userNotFound));
        }

        const validPass = bcrypt.compareSync(password, userFound.password);
        if (!validPass) {
          return Promise.reject(Error(messageErrors.wrongPassword));
        }

        const token = jwt.sign(
          {
            username: userName,
            id: userFound.id,
            name: userFound.name,
            first_name: userFound.first_name,
            last_name: userFound.last_name,
            email: userFound.email,
            id_shipping_list: userFound.id_shipping_list,
            // avatar: avatar_url,
          },
          `${process.env.SECRET_KEY}`,
          { expiresIn: "24h" }
        );
        return {
          token,
        };
      } catch (error) {
        return Promise.reject(Error(messageErrors.defaultError));
      }
    },
    decryptToken: async (_, { token }) => {
      return jwt.verify(token, `${process.env.SECRET_KEY}`) as tokenDecrypted;
    },
  },
};

export default AuthResolver;
