import { BaseResponse } from '..'

interface User {
  id: string
  cnpj: string
  email: string
  username: string
  password: string
  phone: string
  created_at: string
  updated_at: string
}

export interface StoreUserPayload {
  cnpj: string
  email: string
  username: string
  password: string
  phone: string
}

export interface AuthenticateUserPayload {
  cnpj: string
  password: string
}

export interface StoreUserResponse extends BaseResponse {}

export interface AuthenticateUserResponse extends BaseResponse {
  data: User
}
