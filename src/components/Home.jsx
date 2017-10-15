import React, { Component } from 'react'
import { Link } from 'react-router-dom'


let currentFieldIndex = 0
const toggleFields = () => {
  currentFieldIndex++
  return fieldsList[currentFieldIndex]
}

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
      <div>
        <h1 id='home-title-p1' className='text-center'>
          A New Home
        </h1>
        <h2 id="home-title-p2" className='text-center'>For The Latest Research.</h2>
        <h3 id='home-subtitle' className='text-center'>
          nVizn is a preprint aggregator that makes your work easier
        </h3>
        
        <div className='text-center'>
          <span>
            Find The Latest In:
            <Link 
              id='field-rotator-current' 
              to={`/latest/${currentField}`}>
                {currentField}
            </Link>
          </span>
        </div>
      </div>
    )
  }
}

export default Home
