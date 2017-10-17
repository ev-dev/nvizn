import React, { Component } from 'react'
import { connect } from 'react-redux'
import { stringify } from 'query-string'

import { fetchQueryResults } from '../redux/queryReducer'

class SearchAdvanced extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queryInput: ''
    }
  }

  handleQueryChange = ({ target }) => {
    this.setState(state => ({
      ...state,
      queryInput: target.value
    }))
  }

  handleAdvancedQuerySubmit = evt => {
    const { fetchQueryResults } = this.props
    const { queryInput } = this.state
    const selectedSource = evt.target.sourcefilter.value
    evt.preventDefault()

    fetchQueryResults(queryInput, selectedSource)
    
    const searchParams = stringify({
      src: selectedSource,
      q: queryInput
    })
    this.props.history.push(`/results?${searchParams}`)
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleAdvancedQuerySubmit}
          className="form-inline">
          <span className="icon"><i className="fa fa-search"></i></span>
          <input
            onChange={this.handleQueryChange}
            className='form-control'
            id='search-advanced-input'
            name='search-advanced'
            type="search"
            placeholder="Find Papers..."
          />
          <select name='sourcefilter'>
            <option value='all'>All Sources</option>
            <option value='arxiv'>arXiv</option>
            <option value='mag'>MS Academic Graph</option>
          </select>
        </form>
      </div>
    )
  }
}

const mapDispatch = { fetchQueryResults }

export default connect(null, mapDispatch)(SearchAdvanced)
