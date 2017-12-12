import * as React from 'react'
import { Col } from '../../Components/Layout/Col'
import { RouteComponentProps } from 'react-router'
import { CustomerInvitation } from '../../models'
import { LoadingPage } from '../../App/LoadingPage'
import { User } from 'firebase/app'
import { GoogleSignInButton } from '../../Components/Buttons/GoogleSignInButton'
import { Button } from '../../Components/Buttons/Button'

interface CustomerInvitePageProps extends RouteComponentProps<{ id?: string }> {
  user?: User
}
interface CustomerInvitePageState {
  isInvitationLoaded: boolean
  error?: number
  invite?: CustomerInvitation
}
export class CustomerInvitePage extends React.PureComponent<
  CustomerInvitePageProps,
  CustomerInvitePageState
> {
  constructor(props: CustomerInvitePageProps) {
    super(props)
    this.state = {
      isInvitationLoaded: false,
      error: undefined,
      invite: undefined,
    }
  }
  componentDidMount() {
    const inviteId = this.props.match.params.id
    if (inviteId === undefined) {
    } else {
      fetch(
        `https://us-central1-skutan-82826.cloudfunctions.net/getCustomerInvite?id=${
          inviteId
        }`,
      )
        .then(response => {
          if (response.status !== 200) {
            return Promise.reject(response)
          }
          return response.json()
        })
        .then((data: CustomerInvitation) => {
          data.id = inviteId
          this.setState(() => ({
            isInvitationLoaded: true,
            invite: { ...data, expires: new Date(data.expires) },
          }))
        })
        .catch((error: Response) => {
          this.setState(() => ({
            isInvitationLoaded: true,
            error: error.status,
          }))
        })
    }
  }
  render() {
    console.log('CustomerInvitePage', this.state, this.props)
    if (!this.state.isInvitationLoaded) {
      return <LoadingPage />
    }
    if (!this.state.invite) {
      return (
        <Col>
          <h1>Boð fundust ekki</h1>
        </Col>
      )
    }
    if (this.state.invite.expires <= new Date(Date.now())) {
      return (
        <Col>
          <h1>Boðskort útrunnið</h1>
          <p>Boðskort renna út sólarhring eftir að þau eru gefin út.</p>
        </Col>
      )
    }
    if (this.state.invite.usedBy) {
      return (
        <Col>
          <h1>Boðskort hefur nú þegar verið notað</h1>
          <p>Hvert boðskort er aðeins hægt að nota einu sinni.</p>
        </Col>
      )
    }
    return (
      <Col>
        <h1>
          Þér hefur verið boðið að skrá þig í hópinn{' '}
          {this.state.invite.customerName}
        </h1>
        {this.props.user === undefined && [
          <p key="p">
            Það þarf að skrá sig inn áður en hægt er að klára skráningu.
          </p>,
          <GoogleSignInButton key="s" />,
        ]}
        {this.props.user && (
          <div style={{ maxWidth: '100px' }}>
            <Button color="Primary" onClick={() => ({})}>
              Klára skráningu
            </Button>
          </div>
        )}
      </Col>
    )
  }
}
