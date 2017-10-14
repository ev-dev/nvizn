import React, { Component } from 'react'
import { render } from 'react-dom'
import './styles/global.css'

import QueryBar from './QueryBar'
import ResultList from './ResultList'
import { queryArXiv } from './helpers'

class App extends Component {
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
      <div>
        <QueryBar fetchResults={this.fetchResults} />
        <ResultList searchResults={this.state.searchResults} />
      </div>
    )
  }
}


render( <App />, document.getElementById('app'))
