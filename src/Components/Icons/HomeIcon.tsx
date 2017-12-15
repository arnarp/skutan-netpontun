import * as React from 'react'
import * as classNames from 'classnames'
import './icons.css'
import { IconProps } from './IconProps'

export const HomeIcon = (props: IconProps) => (
  <svg
    className={classNames(
      'Svg',
      `Fill-${props.color}`,
      `Size-${props.size}`,
      props.className,
    )}
    viewBox="0 0 24 24"
  >
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
)
