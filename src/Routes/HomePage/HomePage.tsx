import * as React from 'react'

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
    return <h1>Netpöntun</h1>
  }
}
