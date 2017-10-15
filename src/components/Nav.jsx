import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchResults_ARXIV } from '../reducers/arxiv'
import SearchBar from './SearchBar'

class Nav extends Component {
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

  handleQuerySubmit = evt => {
    const { fetchResults_ARXIV, history } = this.props
    const { queryInput } = this.state
    evt.preventDefault()
    fetchResults_ARXIV(queryInput)
    history.push(`/results/${queryInput}`)
  }

  render() {
    return (
      <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
        <a className='navbar-brand' href='#'>nVizn</a>
        <button 
          className='navbar-toggler' 
          type='button' 
          data-toggle='collapse' 
          data-target='#navbarSupportedContent' 
          aria-controls='navbarSupportedContent' 
          aria-expanded='false' 
          aria-label='Toggle navigation'
        >
            <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <a className='nav-link' href='#'>
                Home <span className='sr-only'>(current)</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='#'>Link</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link disabled' href='#'>Disabled</a>
            </li>
          </ul>
          <form
            className='form-inline my-2 my-lg-0'
            onSubmit={this.handleQuerySubmit}>
            <input
              className='form-control animated-search-form'
              type='text'
              name='search'
              placeholder='Search Here...'
              autoFocus
              onChange={this.handleQueryChange}
            />
            <button 
              className='btn btn-outline-success my-2 my-sm-2'
              type='submit'
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    )
  }
}

// const mapState = (state, props) => ({

// })

const mapDispatch = { fetchResults_ARXIV }

export default connect(null, mapDispatch)(Nav)
