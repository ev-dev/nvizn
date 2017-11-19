import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

// import 'bootstrap'
import './styles/index'

import store from './store'
import Routes from './routes'
import NavBar from './components/NavBar'
// import Nav from './components/Nav'


const App = () => (
  <div>
    {/* <Nav /> */}
    <NavBar />
    <Routes />
  </div>
)

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
