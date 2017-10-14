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

  fetchResults = (query, evt=null) => {
    if (evt) evt.preventDefault()
    if (query.length) {
      queryArXiv(query)
        .then(searchResults => {
          this.setState(state => ({
            ...state,
            searchResults 
          }))
        })
        .catch(console.error)
    } else {
      this.setState(state => ({
        ...state,
        searchResults: []
      }))
    }
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
