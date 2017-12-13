import * as React from 'react'
import { Route } from 'react-router-dom'
import { HomePage } from './HomePage'

export const homePageRoutes = [
  <Route key="/" exact path="/" component={HomePage} />,
]
