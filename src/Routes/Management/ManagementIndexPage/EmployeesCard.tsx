import * as React from 'react'
import { Card } from '../../../Components/Layout/Card'
import { Table } from '../../../Components/Table/Table'
import { getFirestore } from '../../../firebase'
import {
  UserRecord,
  UserClaims,
  CustomerInvitation,
  Omit,
} from '../../../model'
import { Row } from '../../../Components/Layout/Row'
import { SendEmployeeInvitationModal } from './SendEmployeeInvitationModal'
import { IconButton } from '../../../Components/Buttons/IconButton'
import { AddIcon } from '../../../Components/Icons/AddIcon'
import './EmployeesCard.css'

interface EmployeesCardProps {
  userClaims: UserClaims
}
interface EmployeesCardState {
  employees?: UserRecord[]
  invitations?: CustomerInvitation[]
}
export class EmployeesCard extends React.PureComponent<
  EmployeesCardProps,
  EmployeesCardState
> {
  unsubscribes: Array<() => void>
  constructor(props: EmployeesCardProps) {
    super(props)
    this.state = {}
    this.unsubscribes = []
  }
  componentDidMount() {
    getFirestore().then(firestore => {
      if (this.props.userClaims.customer) {
        this.unsubscribes.push(
          firestore
            .collection('users')
            .where('customerId', '==', this.props.userClaims.customer.id)
            .onSnapshot(snapshot => {
              this.setState(() => ({
                employees: snapshot.docs.map(d => ({
                  ...(d.data() as Omit<UserRecord, 'uid'>),
                  uid: d.id,
                })),
              }))
            }),
          firestore
            .collection('customerInvites')
            .where('customerId', '==', this.props.userClaims.customer.id)
            .where('expires', '>', new Date())
            .onSnapshot(snapshot => {
              this.setState(() => ({
                invitations: snapshot.docs.map(d => ({
                  ...(d.data() as Omit<CustomerInvitation, 'id'>),
                  id: d.id,
                })),
              }))
            }),
        )
      }
    })
  }
  componentWillUnmount() {
    this.unsubscribes.forEach(u => u())
  }
  render() {
    if (
      !this.props.userClaims.customer ||
      this.props.userClaims.customer.role !== 'manager'
    ) {
      return null
    }
    return (
      <Card>
        <header className="EmployeeCardHeader">
          <Row justifyContent="SpaceBetween" alignItems="Center">
            <h2>Starfsmenn</h2>
            <SendEmployeeInvitationModal
              button={
                <IconButton
                  Icon={AddIcon}
                  color="Primary"
                  label="Bæta við starfsmanni"
                />
              }
              customerId={this.props.userClaims.customer.id}
              customerName={this.props.userClaims.customer.name}
            />
          </Row>
        </header>
        <Table>
          <thead>
            <tr>
              <th>Nafn</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees &&
              this.state.employees.map(e => (
                <tr key={e.uid}>
                  <td>{e.displayName}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        <header className="EmployeeCardHeader">
          <h3>Boðskort</h3>
        </header>
        <Table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Hlutverk</th>
              <th>Gildir til</th>
            </tr>
          </thead>
          <tbody>
            {this.state.invitations &&
              this.state.invitations.map(i => (
                <tr key={i.id}>
                  <td>{i.email}</td>
                  <td>{i.role}</td>
                  <td>{i.expires.toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Card>
    )
  }
}
