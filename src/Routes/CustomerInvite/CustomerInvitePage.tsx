import * as React from 'react'
import { Col } from '../../Components/Layout/Col'
import { RouteComponentProps } from 'react-router'
import { CustomerInvitation, RefreshAuthToken } from '../../models'
import { LoadingPage } from '../../App/LoadingPage'
import { User } from 'firebase/app'
import { GoogleSignInButton } from '../../Components/Buttons/GoogleSignInButton'
import { Button } from '../../Components/Buttons/Button'
import { DoneIcon } from '../../Components/Icons/DoneIcon'
import { Row } from '../../Components/Layout/Row'

interface CustomerInvitePageProps extends RouteComponentProps<{ id?: string }> {
  user?: User
  refreshAuthToken: RefreshAuthToken
}
interface CustomerInvitePageState {
  isInvitationLoaded: boolean
  acceptInProgress: boolean
  error?: number
  invite?: CustomerInvitation
  acceptDone: boolean
  acceptError?: {}
}
export class CustomerInvitePage extends React.PureComponent<
  CustomerInvitePageProps,
  CustomerInvitePageState
> {
  mounted: boolean
  constructor(props: CustomerInvitePageProps) {
    super(props)
    this.state = {
      acceptInProgress: false,
      isInvitationLoaded: false,
      error: undefined,
      invite: undefined,
      acceptDone: false,
      acceptError: undefined,
    }
    this.onAccept = this.onAccept.bind(this)
  }
  componentDidMount() {
    this.mounted = true
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
  componentWillUnmount() {
    this.mounted = false
  }
  onAccept() {
    if (this.state.invite && this.props.user) {
      this.setState(() => ({ acceptInProgress: true }))
      fetch(
        `https://us-central1-skutan-82826.cloudfunctions.net/acceptCustomerInvite?id=${
          this.state.invite.id
        }&uid=${this.props.user.uid}`,
        {
          method: 'POST',
        },
      )
        .then(response => {
          if (response.status === 200 && this.props.user) {
            return this.props
              .refreshAuthToken(
                3000,
                3000,
                claims =>
                  this.state.invite !== undefined &&
                  claims.customer !== undefined &&
                  claims.customer[this.state.invite.customerId] !== undefined,
              )
              .then(() => {
                if (this.mounted) {
                  this.setState(() => ({
                    acceptDone: true,
                    acceptInProgress: false,
                  }))
                }
              })
          } else {
            return this.setState(() => ({
              acceptError: response.status,
              acceptInProgress: false,
            }))
          }
        })
        .catch(error => {
          this.setState(() => ({ acceptError: error, acceptInProgress: false }))
        })
    }
  }
  render() {
    console.log('CustomerInvitePage', this.state, this.props)
    if (!this.state.isInvitationLoaded || this.state.acceptInProgress) {
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
          {this.props.user &&
            this.state.invite.usedBy.uid === this.props.user.uid && (
              <h1>Þú hefur nú þegar notað þetta boðskort</h1>
            )}
          {!this.props.user ||
            (this.state.invite.usedBy.uid !== this.props.user.uid && (
              <h1>Boðskort hefur nú þegar verið notað</h1>
            ))}
          <p>Hvert boðskort er aðeins hægt að nota einu sinni.</p>
        </Col>
      )
    }
    if (this.state.acceptDone) {
      return (
        <Row justifyContent="Start" spacing="Medium">
          <h1>Skráningu lokið</h1>
          <DoneIcon size="XLarge" color="Green" />
        </Row>
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
            <Button color="Primary" onClick={this.onAccept}>
              Klára skráningu
            </Button>
          </div>
        )}
      </Col>
    )
  }
}
