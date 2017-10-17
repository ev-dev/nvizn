import { queryArxiv, queryAzure } from './queryHelpers'

/* ------ Action Types ------ */
const LOADING = 'LOADING'
const LOADED = 'LOADED'
const NEW_QUERY = 'NEW_QUERY'
const GET_QUERY_HISTORY = 'GET_QUERY_HISTORY'
const POPULATE_RESULTS = 'POPULATE_RESULTS'

/* ------ Action Creators ------ */
const loading = () => ({
  type: LOADING
})

const loaded = () => ({
  type: LOADED
})

const newQuery = (term, source, options) => ({
  type: NEW_QUERY,
  query: { term, source, options }
})

const getQueryHistory = history => ({
  type: GET_QUERY_HISTORY,
  history
})

const populateResults = results => ({
  type: POPULATE_RESULTS,
  results
})

/* ------ Thunks ------ */
// TODO: Tag each result with source for conditional filtering after results have been populated

// @param term - the search term
// @param source - the API to query ('all', 'arxiv', 'azure')
// @param options - search options (azureType)
export const fetchQueryResults = (term, source, options) =>
  dispatch => {
    dispatch(loading())
    dispatch(newQuery(term, source, options))
    
    if (source === 'all') {
      Promise.all([
        queryArxiv(term, options),
        queryAzure(term, options)
      ])
      .then(([arxivResults, azureResults]) => {
        dispatch(populateResults([...arxivResults, ...azureResults]))
      })
      .catch(console.error)
    }
    else if (source === 'arxiv') {
      queryArxiv(term, options)
        .then(arxivResults => dispatch(populateResults(arxivResults)))
        .catch(console.error);
    } 
    else if (source === 'mag') {
      queryAzure(term, options)
        .then(azureResults => dispatch(populateResults(azureResults)))
        .catch(console.error);
    }
    else {
      console.error('Error. Query source not recognized.')
    }
  }


/* ------ Reducer ------ */
const initialState = {
  isLoading: false,
  history: [],
  results: []
}

const allSourceQueryReducer = (state=initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      }
    case NEW_QUERY:
      return {
        ...state,
        history: [...state.history, action.query]
      }
    case POPULATE_RESULTS:
      return {
        ...state,
        results: action.results,
        isLoading: false
      }
    default:
      return state
  }
}

export default allSourceQueryReducer