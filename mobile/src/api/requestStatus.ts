import { api } from '@/api'

const requestStatusService = {
  async index() {
    return await api.get('/request/status')
  },
}

export default requestStatusService
