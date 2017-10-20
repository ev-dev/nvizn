const path = require('path')
  , express = require('express')
  , bodyParser = require('body-parser')
  , { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
  , schema = require('./db/schema')
  , app = express()

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  // Logging Middleware
  .use(require('volleyball'))

  // Serve Graphql DB
  .use('/gql', graphqlExpress({ schema }))
  .use('/graphiql', graphiqlExpress({
    endpointURL: '/gql'
  }))

  // Error Endware
  .use((err, req, res, next) => {
    console.error(err, typeof next)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal Server Error.')
  })


const PORT = 5000
const chalk = require('chalk')
app.listen(PORT, () => {
  const name = chalk.red.bold('[DB Test Server]')
  const url = chalk.cyan.bold(`http://localhost:`)
  const listen = chalk.yellow.bold('Listening')

  console.log(`
  ${name} - ${listen} - ${url}${chalk.yellow(PORT)}
  `)
})
