import { api } from '@/api'
import { StoreRequestPayload, UpdateRequestPayload } from '@/types/api/request'

const requestService = {
  async index() {
    return await api.get('/request')
  },
  async show(id: string) {
    return await api.get(`/request/${id}`)
  },
  async store(data: StoreRequestPayload) {
    return await api.post('/request', data)
  },
  async update(id: string, data: UpdateRequestPayload) {
    return await api.patch(`/request/${id}`, data)
  },
}

export default requestService
