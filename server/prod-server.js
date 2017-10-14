const path = require('path')
const express = require('express')
const app = express()

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
    console.log('\n - nVizn - Running on Port 80 -\n')
})