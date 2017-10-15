import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import ResultList from './components/ResultList'
import Feed from './components/Feed'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/results/:query' component={ResultList} />
    <Route path='/latest' component={Feed} />
  </Switch>
)

export default Routes
