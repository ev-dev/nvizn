const path = require('path')
const chalk = require('chalk')
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('volleyball'))

app.use('/academic-graph', require('./msAcademicGraphAPI'))
app.use('/arxiv', require('./arxivAPI'))

app.use((err, req, res, next) => {
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