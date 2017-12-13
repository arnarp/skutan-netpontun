import * as React from 'react'
import * as classNames from 'classnames'
import './icons.css'
import { IconProps } from './IconProps'

export const DoneIcon = (props: IconProps) => (
  <svg
    className={classNames(
      'Svg',
      `Fill-${props.color}`,
      `Size-${props.size}`,
      props.className,
    )}
    viewBox="0 0 24 24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
  </svg>
)
