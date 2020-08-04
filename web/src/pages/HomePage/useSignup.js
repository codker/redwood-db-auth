import gql from 'graphql-tag'
import { useMutation } from '@redwoodjs/web'

const MUTATION = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(input: { email: $email, password: $password }) {
      email
    }
  }
`

export const useSignup = () => {
  const [signup] = useMutation(MUTATION)

  return [signup]
}
