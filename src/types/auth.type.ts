import { SuccessResponse } from './utils.type'
import { User } from './user.type'

export type AuthReponse = SuccessResponse<{
  access_token: string
  expires: string
  user: User
}>
