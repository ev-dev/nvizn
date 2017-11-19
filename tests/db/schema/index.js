const { makeExecutableSchema } = require('graphql-tools')
  , gql = require('graphql-tag')

// @ts-ignore
const typeDefs = gql`
  type Link {
    id: ID!
    url: String!
    description: String!
  }
  
  type Query {
    allLinks: [Link!]!
  }
`

module.exports = makeExecutableSchema({ typeDefs })