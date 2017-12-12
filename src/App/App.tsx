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

interface Claims {
  isAdmin: string | undefined
}

export class App extends React.Component<
  {},
  { user: User | undefined; loading: boolean; claims: Claims | undefined }
> {
  removeAuthStateChangeListener: () => void
  constructor(props: {}) {
    super(props)
    this.state = { user: undefined, loading: true, claims: undefined }
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
  componentWillUnmount() {
    this.removeAuthStateChangeListener()
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <AppBar user={this.state.user} />
          <main className="AppMain">
            {this.state.loading && <LoadingPage />}
            {!this.state.loading && (
              <Switch>
                {customerInviteRoutes(this.state.user)}
                <Route component={PageNotFound} />
              </Switch>
            )}
          </main>
        </div>
      </BrowserRouter>
    )
  }
}
