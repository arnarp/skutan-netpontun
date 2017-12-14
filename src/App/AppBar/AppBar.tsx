import * as React from 'react'
import './AppBar.css'
import * as firebase from 'firebase'
import { User } from 'firebase/app'
import { firebaseAuth } from '../../firebase'
import { Link } from 'react-router-dom'
import { Popover, PopoverControl } from '../../Components/Popover'
import { Col } from '../../Components/Layout/Col'
import { Button } from '../../Components/Buttons/Button'

interface AppBarProps {
  user?: User
}

export class AppBar extends React.PureComponent<AppBarProps, {}> {
  popover: PopoverControl | null
  render() {
    return (
      <div role="banner" className="AppBar">
        <nav className="AppBarNav">
          <Link to="/">Heim </Link>
        </nav>
        {this.props.user && (
          <Popover
            deltaY={-2}
            deltaX={12}
            button={
              <button className="UserBtn">
                {this.props.user.photoURL && (
                  <img className="UserImg" src={this.props.user.photoURL} />
                )}
              </button>
            }
            provideControl={ref => {
              this.popover = ref
            }}
          >
            <div className="AppBarAccountPopover">
              <div className="Info">
                {this.props.user.photoURL && (
                  <img src={this.props.user.photoURL} />
                )}
                <Col>
                  <span className="Bold">{this.props.user.displayName}</span>
                  <span>{this.props.user.email}</span>
                </Col>
              </div>
              <div className="ActionFooter">
                <Button
                  color="Primary"
                  style="Flat"
                  onClick={() => {
                    if (this.popover) {
                      this.popover.closePopover()
                    }
                    setTimeout(() => {
                      firebaseAuth().signOut()
                    }, 300)
                  }}
                >
                  Útskráning
                </Button>
              </div>
            </div>
          </Popover>
        )}
        {!this.props.user && (
          <Button
            color="White"
            style="Flat"
            onClick={() => {
              const provider = new firebaseAuth.GoogleAuthProvider()
              firebase
                .auth()
                .signInWithRedirect(provider)
                .then(result => {})
                .catch(function() {})
            }}
          >
            Innskráning
          </Button>
        )}
      </div>
    )
  }
}
