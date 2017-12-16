import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Transition } from 'react-transition-group'
import * as uuid from 'uuid'
import 'inert-polyfill'
import './Modal.css'
import { IconButton } from '../Buttons/IconButton'
import { CloseIcon } from '../Icons/CloseIcon'

export interface ModalControl {
  closeModal: () => void
}
interface ModalProps {
  button: JSX.Element
  title: string
  provideControl: (ctrl: ModalControl | null) => void
}

interface ModalState {
  open: boolean
}

export class Modal extends React.PureComponent<ModalProps, ModalState> {
  focusWhenOpened: HTMLButtonElement
  closeButton: IconButton | null
  headingId: string
  portalContainer: HTMLElement | null
  constructor(props: ModalProps) {
    super(props)
    this.state = {
      open: false,
    }
    this.headingId = uuid()
    this.portalContainer = document.getElementById('modal-container')
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  componentDidMount() {
    this.props.provideControl({
      closeModal: () => this.handleClose(),
    })
  }

  componentWillUnmount() {
    this.props.provideControl(null)
  }
  handleOpen() {
    this.setState(
      () => ({ open: true }),
      () => {
        this.focusWhenOpened = document.activeElement as HTMLButtonElement
        setTimeout(() => {
          if (this.closeButton) {
            this.closeButton.focus()
          }
          // tslint:disable-next-line:no-any
          const root = document.getElementById('root')
          if (root) {
            root.inert = true
          }
        }, 30)
      },
    )
  }
  handleClose() {
    this.setState(() => ({ open: false }))
    // tslint:disable-next-line:no-any
    const root = document.getElementById('root')
    if (root) {
      root.inert = false
    }
    this.focusWhenOpened.focus()
  }
  render() {
    return (
      <div>
        {React.cloneElement(this.props.button, {
          onClick: this.handleOpen,
        })}
        {this.portalContainer !== null &&
          ReactDOM.createPortal(
            <Transition
              unmountOnExit={true}
              in={this.state.open}
              timeout={{ enter: 0, exit: 500 }}
            >
              {(state: 'entering' | 'entered' | 'exiting' | 'exited') => (
                <div className={`ModalContainer ${state}`}>
                  <div
                    className={`Backdrop ${state}`}
                    onClick={this.handleClose}
                  />
                  <div
                    className={`Modal ${state}`}
                    onKeyDown={event => {
                      if (event.key === 'Escape') {
                        this.handleClose()
                      }
                    }}
                  >
                    <header>
                      <h2 id={this.headingId}>{this.props.title}</h2>
                      <IconButton
                        Icon={CloseIcon}
                        color="Default"
                        onClick={this.handleClose}
                        label="Loka"
                        ref={ref => {
                          this.closeButton = ref
                        }}
                      />
                    </header>
                    <div className="ModalContent">{this.props.children}</div>
                  </div>
                </div>
              )}
            </Transition>,
            this.portalContainer,
          )}
      </div>
    )
  }
}
