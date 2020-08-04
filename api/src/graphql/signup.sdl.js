export const schema = gql`
  input SignupInput {
    email: String!
    password: String!
  }

  type Query {
    login(email: String!, password: String!): String!
  }

  type Mutation {
    signup(input: SignupInput!): User!
  }
`
