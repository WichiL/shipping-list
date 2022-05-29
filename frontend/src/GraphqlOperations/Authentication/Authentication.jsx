import { gql } from "@apollo/client";

export const DECRYPT_TOKEN = gql`
  mutation decryptToken($token: String!) {
    decryptToken(token: $token) {
      id
      username
      name
      first_name
      last_name
      # avatar_url
      email
    }
  }
`;

export const AUTH_USER = gql`
  mutation authUser($input: UserLoginInput!) {
    authUser(input: $input) {
      token
    }
  }
`;
