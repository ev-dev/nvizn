import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchQueryResults } from '../redux/queryReducer'

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queryInput: '',
      showDropdown: false
    }
  }

  toggleDropdown = () => {
    this.setState(state => ({
      ...state,
      showDropdown: !this.state.showDropdown 
    }))
  }

  handleChange = () => {

  }

  handleSubmit = evt => {

  }

  render() {
    const { showDropdown } = this.state
    return (
      <nav className='navbar' onClick={this.toggleDropdown}>
        <div className='navbar-brand'>
          <Link to='/' className='navbar-item'>
            nVizn
          </Link>
          <Link to='https://github.com/ev-dev'>
            <span className='icon'>
              <i className='fa fa-lg fa-github'></i>
            </span>
          </Link>
          <div 
            className='navbar-burger burger'
            onClick={this.toggleDropdown}
          ></div>
          
          {showDropdown && 
            <div className='navbar-menu'>
              <div className='navbar-start'>
                <div className='navbar-item has-dropdown is-hoverable'>
                  <div className='navbar-link'>
                    Menu
                  </div>

                  <div className='navbar-dropdown is-boxed'>
                    <Link to='/advanced' className='navbar-item'>
                      Search
                    </Link>
                    <Link to='/feed' className='navbar-item'>
                      Feed
                    </Link>
                    <Link to='/blog' className='navbar-item'>
                      Blog
                    </Link>
                    <Link to='/sources' className='navbar-item'>
                      Sources
                    </Link>
                    <Link to='/about' className='navbar-item'>
                      About
                    </Link>
                    <hr className='navbar-divider' />
                    <Link to='/profile' className='navbar-item'>
                      Profile
                    </Link>
                  </div>
                </div>  
              </div>
            </div>
          }
        </div>
      </nav>
    )
  }
}

const mapDispatch = { fetchQueryResults }

export default withRouter(connect(null, mapDispatch)(NavBar))
