import { gql } from "apollo-boost";

export const FOLLOW = gql`
  mutation follow($id: String!) {
    follow(id: $id)
  }
`;

export const UNFOLLOW = gql`
  mutation unFollow($id: String!) {
    unFollow(id: $id)
  }
`;
