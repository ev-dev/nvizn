import React, { Component } from 'react'
import { connect } from 'react-redux'

import SingleResult from './SingleResult'
import { fetchResults_ARXIV } from '../reducers/arxiv'

class ResultList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { match, queryResults, fetchResults_ARXIV } = this.props
    if (!queryResults.length) fetchResults_ARXIV(match.params.query)
    return (
      <div>
        <h1 className="title">Results for
        <span id='result-query'>{match.params.query}</span>
        </h1>
        <div className="result-list-container">
          {queryResults && queryResults.map(result => (
            <SingleResult resultData={result} key={result.id[0]} />
          ))}
        </div>
      </div>
    )
  }
}

const mapState = (state, props) => ({
  queryResults: state.arxiv.results
})

const mapDispatch = { fetchResults_ARXIV }

export default connect(mapState, mapDispatch)(ResultList)
