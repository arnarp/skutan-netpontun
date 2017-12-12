import * as React from 'react'
import * as firebase from 'firebase'
import { firebaseAuth } from '../firebase'
import './LoginPage.css'
import { GoogleIcon } from '../Components/Icons/GoogleIcon'

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
              .then(result => {
                // This gives you a Google Access Token.
                // You can use it to access the Google API.
                // var token = result.credential.accessToken
                // The signed-in user info.
                // const user = result.user
                // this.setState(() => ({ user }))
                // ...
              })
              .catch(function() {
                // Handle Errors here.
                // var errorCode = error.code
                // var errorMessage = error.message
                // // The email of the user's account used.
                // var email = error.email
                // // The firebase.auth.AuthCredential type that was used.
                // var credential = error.credential
                // console.log(error)
                // ...
              })
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
