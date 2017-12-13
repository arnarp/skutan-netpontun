import * as React from 'react'
import { Route } from 'react-router-dom'
import { CustomerInvitePage } from './CustomerInvitePage'
import { User } from 'firebase/app'
import { RefreshAuthToken } from '../../models'

export const customerInviteRoutes = (
  refreshAuthToken: RefreshAuthToken,
  user?: User,
) => [
  <Route
    key="/customerInvite"
    path="/customerInvite/:id"
    render={props => (
      <CustomerInvitePage
        user={user}
        refreshAuthToken={refreshAuthToken}
        {...props}
      />
    )}
  />,
]
