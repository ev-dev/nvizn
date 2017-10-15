import axios from 'axios'
import { Parser } from 'xml2js'
import { promisify } from 'bluebird'
const parseXML = promisify(new Parser().parseString)


/* ------ Action Types ------ */
const NEW_QUERY = 'NEW_QUERY'
const GET_QUERY_HISTORY = 'GET_QUERY_HISTORY'
const LOADING_ALL = 'LOADING_ALL'
const LOADED_ALL = 'LOADED_ALL'
const POPULATE_RESULTS_ALL = 'POPULATE_RESULTS_ALL'

const LOADING_ARXIV = 'LOADING_ARXIV'
const LOADED_ARXIV = 'LOADED_ARXIV'
const POPULATE_RESULTS_ARXIV = 'POPULATE_RESULTS_ARXIV'


/* ------ Action Creators ------ */
const newQuery = query => ({
  type: NEW_QUERY,
  query
})

const getQueryHistory = history => ({
  type: GET_QUERY_HISTORY,
  history
})

const loading_ALL = () => ({
  type: LOADING_ALL
})

const loaded_ALL = () => ({
  type: LOADED_ALL
})

const populateResults_ALL = results_ALL => ({
  type: POPULATE_RESULTS_ALL,
  results_ALL
})

// arXiv Actions
const loading_ARXIV = () => ({
  type: LOADING_ARXIV
})

const loaded_ARXIV = () => ({
  type: LOADED_ARXIV
})

const populateResults_ARXIV = results_ARXIV => ({
  type: POPULATE_RESULTS_ARXIV,
  results_ARXIV
})


/* ------ Thunks ------ */
export const fetchResults_ARXIV = query => 
  dispatch => {
    dispatch(loading_ARXIV())
    dispatch(newQuery(query))
    return axios({
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
        dispatch(populateResults_ARXIV(parsed.feed.entry)))
      .catch(console.error);
  }


/* ------ Reducer ------ */
const initialState = {
  isLoading: false,
  history: [],
  allResults: [],
  results_ARXIV: []
}

const queriesReducer = (state=initialState, action) => {
  switch(action.type) {
    case LOADING_ALL:
      return {
        ...state,
        isLoading: true
      }
    case NEW_QUERY:
      return {
        ...state,
        history: [...state.history, action.query]
      }
    case POPULATE_RESULTS_ALL:
      return {
        ...state,
        results_ALL: action.results,
        isLoading: false
      }
    default:
      return state
  }
}

export default queriesReducer
