import { gql } from '@apollo/client'

export const LIST_USERS = gql`
  query ListUsers {
    listUsers {
      id
      name
      email
      role
      createdAt
      updatedAt
    }
  }
`