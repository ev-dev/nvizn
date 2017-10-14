import React, { Component } from 'react'

import QueryBar from './QueryBar'
import ResultList from './ResultList'
import { queryArXiv } from '../helpers'

class Home extends Component {
  state = {
    searchResults: []
  }

  fetchResults = (evt, query) => {
    evt.preventDefault()
    queryArXiv(query)
      .then(searchResults => {
        this.setState({ searchResults })
      })
      .catch(console.error)
  }

  render() {
    return (
      <div className=''>
        <QueryBar fetchResults={this.fetchResults} />
        <ResultList searchResults={this.state.searchResults} />
      </div>
    )
  }
}

export default Home
