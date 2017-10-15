import React, { Component } from 'react'

import SearchBar from './SearchBar'
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
        <SearchBar fetchResults={this.fetchResults} />
        <ResultList searchResults={this.state.searchResults} />
      </div>
    )
  }
}

export default Home
