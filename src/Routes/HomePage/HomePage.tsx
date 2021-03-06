import * as React from 'react'
import { Col } from '../../Components/Layout/Col'
import { BottomNavigation } from '../../Components/Nav/BottomNavigation'

interface HomePageProps {}
interface HomePageState {}
export class HomePage extends React.PureComponent<
  HomePageProps,
  HomePageState
> {
  constructor(props: HomePageProps) {
    super(props)
  }
  render() {
    return (
      <Col>
        <h1>n</h1>
        <BottomNavigation />
      </Col>
    )
  }
}
