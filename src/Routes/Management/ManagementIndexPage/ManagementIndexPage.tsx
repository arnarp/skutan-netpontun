import * as React from 'react'
import { Col } from '../../../Components/Layout/Col'
import { BottomNavigation } from '../../../Components/Nav/BottomNavigation'
import { EmployeesCard } from './EmployeesCard'
import { UserClaims } from '../../../model'
import { RouteComponentProps } from 'react-router'
import { LoginPage } from '../../../Components/Pages/LoginPage'

interface ManagementIndexPageProps extends RouteComponentProps<{}> {
  userClaims?: UserClaims
}
interface ManagementIndexPageState {}
export class ManagementIndexPage extends React.PureComponent<
  ManagementIndexPageProps,
  ManagementIndexPageState
> {
  constructor(props: ManagementIndexPageProps) {
    super(props)
  }
  render() {
    console.log('ManagementIndexPage render', this.props.userClaims)
    if (!this.props.userClaims) {
      return <LoginPage />
    }
    return (
      <Col>
        <EmployeesCard userClaims={this.props.userClaims} />
        <BottomNavigation />
      </Col>
    )
  }
}
