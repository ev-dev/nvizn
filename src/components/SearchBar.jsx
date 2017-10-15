import React, { Component } from 'react'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }

  handleChange = ({ target }) => {
    this.setState({ input: target.value })
  }

  render() {
    const { fetchResults } = this.props
    const { input } = this.state

    return (
      <div>
        <div className="left">Left Div</div>
        <div className="search-container">
          <form 
            className='search-form'
            onSubmit={evt => fetchResults(evt, input)}>
            <input
              className='animated-search-form'
              type='search'
              name='search'
              placeholder='Search All Sources...'
              autoFocus
              onChange={this.handleChange}
            />
          </form>
        </div>
        <div className="right">Right Div</div>
      </div>
    )
  }
}

export default SearchBar