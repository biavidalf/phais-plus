import { StoreUserPayload, StoreUserResponse } from '@/types/api/user'
import { api } from '.'

const userService = {
  async index() {
    return await api.get('/user')
  },
  async store(payload: StoreUserPayload) {
    return await api.post<StoreUserResponse>('/user', payload)
  },
}

export default userService
