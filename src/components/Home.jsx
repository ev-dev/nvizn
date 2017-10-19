import React, { Component } from 'react'
import { Link } from 'react-router-dom'


let currentFieldIndex = 0
const toggleFields = () => {
  currentFieldIndex++
  return fieldsList[currentFieldIndex]
}

const sources = [{
  name: 'Nature Journal',
  pathURL: 'nature',
  srcURL: 'https://nature.com'
}, {
  name: 'arXiv Preprint Service',
  pathURL: 'arxiv',
  srcURL: 'http://arxiv.org'
}]

class Home extends Component {
  state = {
    fieldsList: [
      'Quantum Gravity',
      'Optigenetics',
      'Deep Reinforcement Neural Networks',
      'Climate Change',
      'Biophysics',
      'Condensed Matter'
    ],
    currentFieldIndex: 0,
    currentField: 'Quantum Gravity'
  }

  componentDidMount() {
    setInterval(this.toggleFields, 2000)
  }

  toggleFields = () => {
    const { fieldsList, currentFieldIndex } = this.state
    const nextField = currentFieldIndex < fieldsList.length ? 
      fieldsList[currentFieldIndex + 1]
      : fieldsList[0]

    this.setState(state => ({
      ...state,
      currentFieldIndex: currentFieldIndex + 1,
      currentField: nextField
    }))
  }

  render() {
    const { currentField } = this.state
    return (
      <div className='has-text-centered'>
        <div id='home-banner-container'>
          <h1 id='home-title-p1'>A New Home</h1>
          <h2 id="home-title-p2">For The Latest Research.</h2>
          <h3 id='home-subtitle'>
            <em>nVizn</em> is an aggregator for scientific literature. 
          </h3>
          <h3 id='home-subtitle-p2'>
            We source popular publishers as well as preprint services.
          </h3>

          <div className='field-rotator-container'>
            <p className='find-latest-title'>Find The Latest In:</p>
            <Link
              className='field-rotator-current'
              to={`/latest/${currentField}`}>
                {` ${currentField}`}
            </Link>
          </div>

          <div className='source-list-container'>
            <h3 id='source-list-title'>
              Our Current Sources
            </h3>
            <div className='source-list'>
              {sources.map(src => (
                <div className='single-source'>
                  <span>
                    <Link to={`/sources/${src.pathURL}`}>{src.name}</Link>
                    <Link to={src.srcURL}>
                      <span className='icon'>
                        <i className='fa fa-sort-up'></i>
                      </span>
                    </Link>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
