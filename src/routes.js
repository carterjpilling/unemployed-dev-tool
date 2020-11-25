import { Route, Switch } from 'react-router-dom'
import React from 'react'

import Cal from './Components/Cal'
import JobsBoard from './Components/JobsBoard'
import StatsBoard from './Components/StatsBoard'
export default (
  <Switch>
    <Route path='/dashboard' component={Cal} />
    <Route path='/jobsboard' component={JobsBoard} />
    <Route path='/statsboard' componet={StatsBoard} />

  </Switch>
)