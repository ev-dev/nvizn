import React, { Component } from 'react'

class QueryBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }

  handleChange = ({ target }) => {
    this.setState(state => ({
      ...state,
      input: target.value
    }))
    this.props.fetchResults(this.state.input)
  }``

  render() {
    const { fetchResults } = this.props
    const { input } = this.state

    return (
      <div>
        <form onSubmit={evt => fetchResults(input, evt)}>
          <input
            className='center query-input'
            autoFocus
            placeholder='Search arXiv Repository...'
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }
}

export default QueryBar