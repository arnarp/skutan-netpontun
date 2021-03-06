import * as React from 'react'
import { User } from 'firebase/app'
import { BrowserRouter } from 'react-router-dom'
import { firebaseAuth } from '../firebase'
import { LoadingPage } from './LoadingPage'
import { AppBar } from './AppBar'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import { customerInviteRoutes } from '../Routes/CustomerInvite/routes'
import { PageNotFound } from './PageNotFound'
import { b64DecodeUnicode } from '../Utils/decode'
import { homePageRoutes } from '../Routes/HomePage/routes'
import { UserClaims } from '../model'
import { delay } from '../Utils/delay'
import { managementRoutes } from '../Routes/Management/routes'

interface AppState {
  user?: User
  loading: boolean
  claims?: UserClaims
}

export class App extends React.Component<{}, AppState> {
  removeAuthStateChangeListener: () => void
  constructor(props: {}) {
    super(props)
    this.refreshAuthToken = this.refreshAuthToken.bind(this)
    this.state = { user: undefined, loading: true, claims: undefined }
    this.onLogout = this.onLogout.bind(this)
  }
  componentDidMount() {
    this.removeAuthStateChangeListener = firebaseAuth().onAuthStateChanged(
      user => {
        if (user) {
          user.getIdToken().then(idToken => {
            const claims = JSON.parse(b64DecodeUnicode(idToken.split('.')[1]))
            this.setState(() => ({ claims }))
          })
          this.setState(() => ({ user, loading: false }))
        } else {
          this.setState(() => ({ user: undefined, loading: false }))
        }
      },
    )
  }
  refreshAuthToken(
    initialDelay: number = 0,
    retryDelay: number = 2000,
    until?: (claims: UserClaims) => boolean,
  ) {
    const loop: (user: User) => Promise<UserClaims> = user =>
      user.getIdToken(true).then(idToken => {
        const claims: UserClaims | undefined = JSON.parse(
          b64DecodeUnicode(idToken.split('.')[1]),
        )
        if (claims === undefined || (until && !until(claims))) {
          return delay(retryDelay).then(() => loop(user))
        } else {
          return Promise.resolve(claims)
        }
      })
    return delay(initialDelay)
      .then(() => {
        if (!this.state.user) {
          return Promise.reject('User not logged in')
        }
        return loop(this.state.user)
      })
      .then(claims => this.setState(() => ({ claims })))
  }
  componentWillUnmount() {
    this.removeAuthStateChangeListener()
  }
  onLogout() {
    this.setState(() => ({ claims: undefined }))
  }
  render() {
    console.log('App render', this.state)
    return (
      <BrowserRouter>
        <div className="App">
          <AppBar user={this.state.user} onLogout={this.onLogout} />
          <main className="AppMain">
            {this.state.loading && <LoadingPage />}
            {!this.state.loading && (
              <Switch>
                {homePageRoutes}
                {managementRoutes(this.state.claims)}
                {customerInviteRoutes(this.refreshAuthToken, this.state.user)}
                <Route component={PageNotFound} />
              </Switch>
            )}
          </main>
        </div>
      </BrowserRouter>
    )
  }
}
