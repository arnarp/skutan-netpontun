import * as React from 'react'
import { Route } from 'react-router-dom'
import { ManagementIndexPage } from './ManagementIndexPage/ManagementIndexPage'
import { UserClaims } from '../../model'

export const managementRoutes = (userClaims?: UserClaims) => [
  <Route
    key="/managementIndexPage"
    path="/management"
    render={props => <ManagementIndexPage {...props} userClaims={userClaims} />}
  />,
]
