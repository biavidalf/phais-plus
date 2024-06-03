import { BaseResponse } from '..'

export interface StoreUserPayload {
  cnpj: string
  email: string
  username: string
  password: string
  phone: string
}

export interface StoreUserResponse extends BaseResponse {}
