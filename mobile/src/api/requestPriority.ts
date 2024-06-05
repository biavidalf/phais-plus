import { api } from '@/api'

const requestPriorityService = {
  async index() {
    return await api.get('/request/priority')
  },
}

export default requestPriorityService
