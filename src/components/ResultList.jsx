import React from 'react'
import { connect } from 'react-redux'

import SingleResult from './SingleResult'

const ResultList = ({ queryResults }) => (
  <div className="result-list-container">
    {queryResults && queryResults.map(result => (
      <SingleResult resultData={result} key={result.id[0]}/>
    ))}
  </div>
)

const mapState = (state, props) => ({
  queryResults: state.arxiv.results
})

export default connect(mapState)(ResultList)
