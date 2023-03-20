type Roles = 'user' | 'admin'
export interface User {
  roles: Roles[]
  _id: string
  email: string
  createdAt: string
  updatedAt: string
}
