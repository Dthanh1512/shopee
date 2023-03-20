import http from 'src/utils/http'
import { AuthReponse } from 'src/types/auth.type'

const authApi = {
  registerAccount: (body: { email: string; password: string }) => http.post<AuthReponse>('/register', body),
  login: (body: { email: string; password: string }) => http.post<AuthReponse>('/login', body),
  logout: () => http.post('/logout')
}
export default authApi
