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
    setTimeout(this.toggleFields(), 2000)
  }

  toggleFields = () => {
    const { fieldsList, currentFieldIndex } = this.state
    const nextField = fieldsList[currentFieldIndex + 1] 
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
        <h1 className="title">Home</h1>
        <p className="subtitle">We Are Research.</p>
        <h3>nVizn is a preprint aggregator that makes your work easier</h3>
        <Link to='/latest'>Find The Latest In: 
          <span id='field-rotator-current'>{currentField}</span>
        </Link>
      </div>
    )
  }
}

export default Home
