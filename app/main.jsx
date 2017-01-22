'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'

import store from './store'
import Routes from './components/Routes'

require('./stylesheets/style.scss')

render (
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('main')
)