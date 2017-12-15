import * as React from 'react'
import { Route } from 'react-router-dom'
import { ManagementIndexPage } from './ManagementIndexPage'

export const managementRoutes = () => [
  <Route
    key="/managementIndexPage"
    path="/management"
    render={props => <ManagementIndexPage />}
  />,
]
