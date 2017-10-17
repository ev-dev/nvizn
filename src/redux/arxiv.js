import axios from 'axios'
import { Parser } from 'xml2js'
import { promisify } from 'bluebird'
const parseXML = promisify(new Parser().parseString)


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

const newQuery = query => ({
  type: NEW_QUERY,
  query
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
export const fetchResults_ARXIV = query =>
  dispatch => {
    dispatch(loading())
    dispatch(newQuery(query))
    axios({
      method: 'get',
      baseURL: 'http://export.arxiv.org/api/query',
      url: '/',
      params: {
        search_query: `all:${query}`
      }
    })
      .then(res => res.data)
      // @ts-ignore
      .then(xmlResponse => parseXML(xmlResponse))
      .then(parsed =>
        dispatch(populateResults(parsed.feed.entry)))
      .catch(console.error);
  }


/* ------ Reducer ------ */
const initialState = {
  isLoading: false,
  history: [],
  results: []
}

const arxivReducer = (state=initialState, action) => {
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

export default arxivReducer