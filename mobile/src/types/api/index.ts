export interface BaseResponse {
  status: number
  message: string
  data?: object | string | null
}
