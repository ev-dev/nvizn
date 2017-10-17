const express = require('express')
  , bodyParser = require('body-parser')
  , chalk = require('chalk')
  , app = express()

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(require('volleyball'))

  .use('/api/academic-graph', require('./msAcademicGraphAPI'))
  .use('/api/arxiv', require('./arxivAPI'))

  .use((err, req, res, next) => {
    console.error(err, typeof next)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal Server Error.')
  })

const PORT = 5000
app.listen(PORT, () => {
  const name = chalk.red.bold('[API Test Service]')
  const url = chalk.cyan.bold(`http://localhost:`)
  const listen = chalk.yellow.bold('Listening')

  console.log(`
  ${name} - ${listen} - ${url}${chalk.yellow(PORT)}
  `)
})