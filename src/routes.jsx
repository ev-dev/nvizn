import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home'
import SearchAdvanced from './components/SearchAdvanced'
import ResultList from './components/ResultList'
import Feed from './components/Feed'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/advanced' component={SearchAdvanced} />
    <Route path='/results' component={ResultList} />
    <Route path='/latest' component={Feed} />
  </Switch>
)

export default Routes

/*
Resulting URI:
/results?src=arxiv&q=proton

*/