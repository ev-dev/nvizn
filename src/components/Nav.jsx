import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { stringify } from 'query-string'


import { fetchQueryResults } from '../redux/queryReducer'

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
    const { fetchQueryResults } = this.props
    const { queryInput } = this.state
    evt.preventDefault()
    fetchQueryResults(queryInput, 'all')

    const searchParams = stringify({
      src: 'all',
      q: queryInput
    })
    this.props.history.push(`/results?${searchParams}`)
  }

  render() {
    return (
      <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
        <Link to='/' className='navbar-brand'>nVizn</Link>
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
            <li className='nav-item'>
              <Link to='/advanced' className='nav-link'>
                Search
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/feed' className='nav-link'>Latest</Link>
            </li>
          </ul>
          {/* <form
            className='form-inline my-2 my-lg-0 query-form'
            onSubmit={this.handleQuerySubmit}>
            <input
              className='form-control animated-search-form'
              type='search'
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
          </form> */}
          
          <form 
            onSubmit={this.handleQuerySubmit}
            className="form-inline container-2">
              <span className="icon"><i className="fa fa-search"></i></span>
              <input
                onChange={this.handleQueryChange}
                className='form-control'
                id='search'
                name='search'
                type="search"
                placeholder="Find Papers..."
              />
          </form>
        
        </div>
      </nav>
    )
  }
}

// const mapState = (state, props) => ({

// })

const mapDispatch = { fetchQueryResults }

export default withRouter(connect(null, mapDispatch)(Nav))
