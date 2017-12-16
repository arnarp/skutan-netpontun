import * as React from 'react'
import * as classNames from 'classnames'
import './Table.css'

interface TableProps {
  className?: string
}
interface TableState {}
export class Table extends React.PureComponent<TableProps, TableState> {
  constructor(props: TableProps) {
    super(props)
  }
  render() {
    return (
      <div className="TableContainer">
        <table className={classNames('Table', this.props.className)}>
          {this.props.children}
        </table>
      </div>
    )
  }
}
