import React from 'react'
import { connect } from 'react-redux'

import SingleResult from './SingleResult'

const ResultList = ({ queryResults, match }) => (
  <div>
    <h1 className="title">Results for 
      <span id='result-query'>{match.params.query}</span>
    </h1>
    <div className="result-list-container">
      {queryResults && queryResults.map(result => (
        <SingleResult resultData={result} key={result.id[0]}/>
      ))}
    </div>
  </div>
)

const mapState = (state, props) => ({
  queryResults: state.arxiv.results
})

export default connect(mapState)(ResultList)
