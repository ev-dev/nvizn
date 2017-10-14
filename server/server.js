const path = require('path')
const chalk = require('chalk')
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const { Parser } = require('xml2js')
const { promisify } = require('bluebird')
const parseXML = promisify(new Parser().parseString)
const baseURL = 'http://export.arxiv.org/api/query'
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('volleyball'))

app.param('source', (req, res, next) => {
  
})

app.post('/api', (req, res, next) => {

})



app.post('/api/arXiv/:query', (req, res, next) => {
  //@ts-ignore
  axios({
    method: 'get',
    baseURL,
    url: '/',
    params: {
      search_query: `all:${req.params.query}`
    }
  })
    .then(res => res.data)
    .then(xmlResponse => parseXML(xmlResponse))
    .then(parsed => {
      console.log('API request finished with result: ', parsed.feed.entry)
      res.json(parsed)
    })
    .catch(next)
})

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

const PORT = 5000
app.listen(PORT, () => {
  const name = chalk.red.bold('[arXiv Server]')
  const url = chalk.cyan.bold(`http://localhost:`)
  const listen = chalk.yellow.bold('Listening')
  
  console.log(`
  ${name} - ${listen} - ${url}${chalk.yellow(PORT)}
  `)
})




