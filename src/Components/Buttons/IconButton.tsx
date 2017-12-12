import * as React from 'react'
import './IconButton.css'
import { IconProps } from '../Icons/IconProps'
import { MainColors } from '../../types'
import * as classNames from 'classnames'

interface IconButtonProps {
  Icon: (props: IconProps) => JSX.Element
  onClick?: () => void
  color: MainColors
  disabled?: boolean
  label: string
}
interface IconButtonState {}
export class IconButton extends React.PureComponent<
  IconButtonProps,
  IconButtonState
> {
  button: HTMLButtonElement | null
  constructor(props: IconButtonProps) {
    super(props)
  }
  focus() {
    if (this.button) {
      this.button.focus()
    }
  }
  render() {
    return (
      <button
        ref={ref => {
          this.button = ref
        }}
        type="button"
        disabled={this.props.disabled}
        aria-label={this.props.label}
        onClick={this.props.onClick}
        className={classNames('IconButton', `Color-${this.props.color}`)}
      >
        <this.props.Icon
          size="Medium"
          color={this.props.disabled ? 'Default' : this.props.color}
        />
      </button>
    )
  }
}
