import { Router } from 'express'
import NatureAPI from './nature'

export default Router()
  .use('/nature', NatureAPI)