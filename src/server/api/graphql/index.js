import { Router } from 'express'
import { makeExecutableSchema } from 'graphql-tools'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { merge } from 'lodash'

import _Root, { _User, _Paper } from './types'
import { Users, Papers } from './resolvers'

const schema = makeExecutableSchema({
  typeDefs: [ _Root, _User, _Paper ],
  resolvers: merge(Users, Papers)
})

export default Router()
  .use('/root', graphqlExpress({ schema }))
  
  .use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: 'ws://localhost:3000/subscriptions'
  }))
