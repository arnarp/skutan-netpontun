import * as React from 'react'
import * as firebase from 'firebase'
import { firebaseAuth } from '../../firebase'
import './LoginPage.css'
import { GoogleIcon } from '../Icons/GoogleIcon'

export class LoginPage extends React.Component {
  render() {
    return (
      <section className="LoginPage">
        <h1>Innskráning</h1>
        <button
          onClick={() => {
            const provider = new firebaseAuth.GoogleAuthProvider()
            firebase
              .auth()
              .signInWithRedirect(provider)
              .then(result => {})
              .catch(function() {})
          }}
          className="GoogleSignInButton"
        >
          <div className="ImgContainer">
            <GoogleIcon />
          </div>
          <span>Innskráning með Google</span>
        </button>
      </section>
    )
  }
}
