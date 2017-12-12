import * as React from 'react'
import './AppBar.css'
import { User } from 'firebase/app'
import { firebaseAuth } from '../../firebase'
import { Link } from 'react-router-dom'
import { Popover, PopoverControl } from '../../Components/Popover'
import { Col } from '../../Components/Layout/Col'

interface AppBarProps {
  user?: User
}

export class AppBar extends React.PureComponent<AppBarProps, {}> {
  popover: PopoverControl | null
  render() {
    return (
      <div role="banner" className="AppBar BlueBackground">
        <nav className="AppBarNav">
          <Link to="/">Heim </Link>
        </nav>
        {this.props.user && (
          <Popover
            deltaY={-2}
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
                  <span>{this.props.user.displayName}</span>
                  <span>{this.props.user.email}</span>
                </Col>
              </div>
              <div className="ActionFooter">
                <button
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
                </button>
              </div>
            </div>
          </Popover>
        )}
      </div>
    )
  }
}
