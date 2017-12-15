import * as React from 'react'
import './BottomNavigation.css'
import { NavLink } from 'react-router-dom'
import { HomeIcon } from '../Icons/HomeIcon'
import { BusinessIcon } from '../Icons/BusinessIcon'

interface BottomNavigationProps {}
interface BottomNavigationState {}
export class BottomNavigation extends React.PureComponent<
  BottomNavigationProps,
  BottomNavigationState
> {
  constructor(props: BottomNavigationProps) {
    super(props)
  }
  render() {
    return (
      <nav className="BottomNavigation">
        <NavLink exact to="/">
          <HomeIcon size="Medium" />
        </NavLink>
        <NavLink exact to="/management">
          <BusinessIcon size="Medium" />
        </NavLink>
      </nav>
    )
  }
}
