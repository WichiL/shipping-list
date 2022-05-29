import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Query($getUserId: Int!) {
    getUser(id: $getUserId) {
      id
      name
      first_name
      last_name
      email
      username
      ShippingList {
        id
        id_user
        element
      }
      Avatar {
        id
        avatar_url
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($idUser: Int!, $input: UserInput!) {
    updateUser(idUser: $idUser, input: $input)
  }
`;
