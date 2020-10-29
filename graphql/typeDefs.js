const { gql } = require('apollo-server');

module.exports = gql`
    type User {
        id: ID!
        name: String!
        lastName: String!
        username: String!
        email: String!
        password: String!
        createdAt: String!
        token: String!
    }
    input RegisterUserInput {
        name: String!
        lastName: String!
        username: String!
        email: String!
        password: String!
        repeatPassword: String!
    }
    type Query {
        getUsers: [User]
    }
    type Mutation {
        register(registerUser: RegisterUserInput):User!
        login(username: String!, password: String!):User!
    }

`