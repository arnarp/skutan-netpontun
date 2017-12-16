import * as React from 'react'
import './Table.css'

interface TheadProps {
  children: React.ReactNode
}

export const Thead = (props: TheadProps) => (
  <thead className="THead">{props.children}</thead>
)
