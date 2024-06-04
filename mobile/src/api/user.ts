import {
  AuthenticateUserPayload,
  StoreUserPayload,
  StoreUserResponse,
} from '@/types/api/user'
import { api } from '.'

const userService = {
  async index() {
    return await api.get('/user')
  },
  async store(payload: StoreUserPayload) {
    return await api.post<StoreUserResponse>('/user', payload)
  },
  async authenticate(payload: AuthenticateUserPayload) {
    return await api.post('/user/authenticate', payload)
  },
}

export default userService
