import * as React from 'react'
import { firebaseAuth } from '../../firebase'
import * as firebase from 'firebase'
import { GoogleIcon } from '../Icons/GoogleIcon'
import './GoogleSignInButton.css'

interface GoogleSignInButtonProps {}
interface GoogleSignInButtonState {}
export class GoogleSignInButton extends React.PureComponent<
  GoogleSignInButtonProps,
  GoogleSignInButtonState
> {
  constructor(props: GoogleSignInButtonProps) {
    super(props)
  }
  render() {
    return (
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
    )
  }
}
