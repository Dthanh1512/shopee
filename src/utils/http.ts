import { setAccessTokenToLS, clearAccessToken, getAccessTokenFromLS, setProfileToLS } from './auth'
import axios, { type AxiosInstance, HttpStatusCode, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { identity } from 'lodash'
import { AuthReponse } from 'src/types/auth.type'

class Http {
  instance: AxiosInstance
  private accessToken: string
  constructor() {
    this.accessToken = getAccessTokenFromLS() //lay tu ram , lay tu local no bi cham
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      //gui len be
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config

        if (url === '/login' || url === '/register') {
          const data = response.data as AuthReponse
          this.accessToken = data.data.access_token
          setAccessTokenToLS(this.accessToken)
          setProfileToLS(data.data.user)
        } else if (url === 'logout') {
          this.accessToken = ''
          clearAccessToken()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
