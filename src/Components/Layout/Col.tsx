import * as React from 'react'
import * as classNames from 'classnames'
import './Col.css'

interface ColProps {
  children: React.ReactNode
  spacing?: 'Medium'
  justifyContent?: 'Start' | 'End' | 'SpaceBetween'
  className?: string
}

export const Col = (props: ColProps) => (
  <div
    className={classNames(
      'Col',
      props.spacing ? `Spacing-${props.spacing}` : '',
      {
        JustifyContentStart: props.justifyContent === 'Start',
        JustifyContentEnd: props.justifyContent === 'End',
        JustifyContentSpaceBetween: props.justifyContent === 'SpaceBetween',
      },
      props.className,
    )}
  >
    {props.children}
  </div>
)
