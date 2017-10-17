import React, { Component } from 'react'
import { connect } from 'react-redux'
import { parse } from 'query-string'

import SingleResult from './SingleResult'
import { fetchQueryResults } from '../redux/queryReducer'

class ResultList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { fetchQueryResults, queryResults, location } = this.props
    const { q, src } = parse(location.search)
    if (!queryResults.length) fetchQueryResults(q, src)

    return (
      <div>
        <h1 className="title">Results for
          <span id='result-query'> {q}</span>
        </h1>
        <div className="result-list-container">
          {queryResults && queryResults.map((result, i) => (
            <SingleResult resultData={result} key={i} />
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  queryResults: state.query.results
})

const mapDispatch = { fetchQueryResults }

export default connect(mapState, mapDispatch)(ResultList)
