import * as React from 'react'
import { Col } from '../../Components/Layout/Col'
import { BottomNavigation } from '../../Components/Nav/BottomNavigation'

interface ManagementIndexPageProps {}
interface ManagementIndexPageState {}
export class ManagementIndexPage extends React.PureComponent<
  ManagementIndexPageProps,
  ManagementIndexPageState
> {
  constructor(props: ManagementIndexPageProps) {
    super(props)
  }
  render() {
    return (
      <Col>
        <h1>Man</h1>
        <BottomNavigation />
      </Col>
    )
  }
}
