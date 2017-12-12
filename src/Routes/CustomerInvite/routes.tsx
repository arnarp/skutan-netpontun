import * as React from 'react'
import { Route } from 'react-router-dom'
import { CustomerInvitePage } from './CustomerInvitePage'
import { User } from 'firebase/app'

export const customerInviteRoutes = (user?: User) => [
  <Route
    key="/customerInvite"
    path="/customerInvite/:id"
    render={props => <CustomerInvitePage user={user} {...props} />}
  />,
]
