import { combineReducers } from 'redux'

// import { reducer_ALL_QUERIES } from './queries_ALL'
import arxiv from './arxiv'

const rootReducer = combineReducers({
  // reducer_ALL_QUERIES,
  arxiv
})

export default rootReducer