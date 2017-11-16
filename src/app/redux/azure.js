import axios from 'axios'

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
export const fetchResults_AZURE = (query, type='evaluate') =>
  dispatch => {
    dispatch(loading())
    dispatch(newQuery(query))
    axios({
      method: 'get',
      baseURL: 'https://westus.api.cognitive.microsoft.com/academic/v1.0',
      url: `/${type}`,
      params: {
        expr: query
      },
      headers: {
        'Ocp-Apim-Subscription-Key': '00e758750ce740e19d501efaba69f8e7'
      }
    })
      .then(res => res.data.entities)
      .then(results =>
        dispatch(populateResults(results)))
      .catch(console.error);
  }


/* ------ Reducer ------ */
const initialState = {
  isLoading: false,
  history: [],
  results: []
}

const azureReducer = (state = initialState, action) => {
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

export default azureReducer