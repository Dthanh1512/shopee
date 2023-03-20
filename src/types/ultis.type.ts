export interface SuccessResponse<Data> {
  messege: string
  data: Data
}
export interface ErrorResponse<Data> {
  messege: string
  data?: Data
}
