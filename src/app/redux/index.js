import { combineReducers } from 'redux'

import query from './queryReducer'

const rootReducer = combineReducers({
  query
})

export default rootReducer