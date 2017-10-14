const path = require('path')
const chalk = require('chalk')
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('volleyball'))

app.get('/bundle.js', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'bundle.js'))
})

app.use((req, res, next) => {
  if (path.extname(req.path).length > 0) res.status(404).end()
  else next(null)
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

app.use((err, req, res, next) => {
  console.error(err, typeof next)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal Server Error.')
})

const PORT = 80
app.listen(PORT, () => {
  const name = chalk.red.bold('[arXiv Server]')
  const url = chalk.cyan.bold(`http://localhost:`)
  const listen = chalk.yellow.bold('Listening')
  
  console.log(`
  ${name} - ${listen} - ${url}${chalk.yellow(PORT)}
  `)
})
