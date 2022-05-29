import { gql } from "@apollo/client";

export const ADD_ELEMENT = gql`
  mutation Mutation($input: ShippingElement!) {
    addElementToShippingList(input: $input)
  }
`;

export const DELETE_ELEMENT = gql`
  mutation DeleteElementFromShippingList($idShippingList: Int!, $idUser: Int!) {
    deleteElementFromShippingList(
      idShippingList: $idShippingList
      idUser: $idUser
    )
  }
`;
