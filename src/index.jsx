import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import './styles/global.css'
import Routes from './routes'
import Nav from './components/Nav'


const App = () => (
  <div className=''>
    <Nav />
    <Routes />    
  </div>
)


render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app')
)
