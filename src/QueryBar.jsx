import React, { Component } from 'react'

class QueryBar extends Component {
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
        <form onSubmit={evt => fetchResults(evt, input)}>
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