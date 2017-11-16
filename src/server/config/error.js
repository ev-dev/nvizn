import { Router } from 'express'

export default Router()
  .use((err, req, res, next) => {
    console.error(err, typeof next)
    console.error(err.stack)

    res.status(err.status || 500)
      .send(err.message || 'Internal Server Error.')
  })