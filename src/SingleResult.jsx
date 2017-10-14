import React, { Component } from 'react'
import Latex from 'react-latex'

class SingleResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSummary: false
    }
  }

  toggleShowSummary = () => {
    this.setState({ showSummary: !this.state.showSummary})
  }

  render() {
    const { resultData } = this.props
    return (
      <div className='single-result-container'>
        <a className='title result-title'
          onClick={this.toggleShowSummary}
        >
          <Latex>
            {resultData.title.toString()}
          </Latex>
        </a>

        {this.state.showSummary &&
          <div className='summary-container'>
            <p className='subtitle result-summary'>
              <Latex className='result-summary-innner'>
                {resultData.summary.slice(0, 10).toString()}
              </Latex>
            </p>
          </div>
        }
      </div>
    )
  }
}

export default SingleResult