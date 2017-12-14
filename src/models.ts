export interface Customer {
  readonly id: string
  readonly name: string
  readonly kennitala: string
  readonly navisionId: string
  divisions: ReadonlyArray<CustomerDivision>
}
export interface CustomerDivision {
  readonly navisionId: string
  readonly name: string
  readonly address: string
}

export const enum EmployeeRole {
  Manager = 'manager',
  Employee = 'employee',
}

export interface CustomerInvitation {
  id: string
  customerId: string
  customerName: string
  email: string
  expires: Date
  role: EmployeeRole
  usedBy?: {
    uid: string
    userDisplayName: string
  }
}
export interface UserRecord {
  uid: string
  displayName: string
  email: string
  photoURL: string
  customerId?: string
}
export interface UserClaims {
  isAdmin?: string
  customer?: {
    [customerId: string]: {
      role: EmployeeRole
      name: string
    }
  }
}

export type RefreshAuthToken = (
  initialDelay: number,
  retryDelay: number,
  until?: (claims: UserClaims) => boolean,
) => Promise<void>
