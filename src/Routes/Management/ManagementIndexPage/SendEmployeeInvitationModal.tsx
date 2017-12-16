import * as React from 'react'
import { Modal, ModalControl } from '../../../Components/Modal/Modal'
import { Col } from '../../../Components/Layout/Col'
import { TextInput } from '../../../Components/Inputs/TextInput'
import { EmailTextInputValidator } from '../../../Components/Inputs/TextInputValidators'
import { Row } from '../../../Components/Layout/Row'
import { Button } from '../../../Components/Buttons/Button'
import { isEmail } from '../../../Utils/stringValidators'
import { FormEvent } from 'react'
import { EmployeeRole, CustomerInvitation, Omit } from '../../../model'
import { RadioGroup } from '../../../Components/Inputs/RadioGroup'
import { addDays } from '../../../Utils/dateUtils'
import { getFirestore } from '../../../firebase'

interface SendEmployeeInvitationModalProps {
  button: JSX.Element
  customerId: string
  customerName: string
}
interface SendEmployeeInvitationModalState {
  emailAddress: string
  role: EmployeeRole
  hasClickedSubmit: boolean
}
const initialState: SendEmployeeInvitationModalState = {
  emailAddress: '',
  role: EmployeeRole.Employee,
  hasClickedSubmit: false,
}
const isValidState = (state: SendEmployeeInvitationModalState) =>
  isEmail(state.emailAddress)

const EmployeeRoleRadioGroup = RadioGroup as {
  new (): RadioGroup<EmployeeRole>
}

export class SendEmployeeInvitationModal extends React.PureComponent<
  SendEmployeeInvitationModalProps,
  SendEmployeeInvitationModalState
> {
  modal: ModalControl | null
  constructor(props: SendEmployeeInvitationModalProps) {
    super(props)
    this.state = initialState
    this.onSubmit = this.onSubmit.bind(this)
  }
  onSubmit(event: FormEvent<{}>) {
    event.preventDefault()
    this.setState(() => ({ hasClickedSubmit: true }))
    if (isValidState(this.state)) {
      const invitation: Omit<CustomerInvitation, 'id'> = {
        customerId: this.props.customerId,
        customerName: this.props.customerName,
        email: this.state.emailAddress,
        expires: addDays(new Date(), 1),
        role: this.state.role,
      }
      if (this.modal) {
        this.modal.closeModal()
      }
      getFirestore().then(firestore => {
        firestore.collection('customerInvites').add(invitation)
      })
    }
  }
  render() {
    return (
      <Modal
        title="Senda starfsmanni boð"
        button={this.props.button}
        provideControl={ref => (this.modal = ref)}
      >
        <div className="SendEmployeeInvitationModal">
          <form noValidate onSubmit={this.onSubmit}>
            <Col spacing="Medium">
              <TextInput
                label="Email"
                value={this.state.emailAddress}
                onChange={emailAddress =>
                  this.setState(() => ({ emailAddress }))
                }
                validators={[EmailTextInputValidator]}
                hasClickedSubmit={this.state.hasClickedSubmit}
                type="email"
              />
              <EmployeeRoleRadioGroup
                legend="Hlutverk"
                options={[
                  { value: EmployeeRole.Employee, label: 'Starfsmaður' },
                  { value: EmployeeRole.Manager, label: 'Umsjónarmaður' },
                ]}
                value={this.state.role}
                onChange={value => this.setState(() => ({ role: value }))}
              />
              <Row spacing="Medium" justifyContent="End">
                <Button
                  style="Flat"
                  color="Default"
                  onClick={() => {
                    this.setState(() => initialState)
                    if (this.modal) {
                      this.modal.closeModal()
                    }
                  }}
                >
                  Hætta við
                </Button>
                <Button
                  style="Flat"
                  color="Primary"
                  lookLikeDisabled={!isValidState(this.state)}
                  type="submit"
                >
                  Vista
                </Button>
              </Row>
            </Col>
          </form>
        </div>
      </Modal>
    )
  }
}
