import { gql } from "@apollo/client"

export const REGISTER = gql`
    mutation Signup($data: RegisterInput!) {
        signup(data: $data) {
            token
            refreshToken
            user {
                id
                name
                email
                role
                createdAt
                updatedAt
            }
        }
    }
`