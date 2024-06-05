import { api } from '@/api'

const medicineService = {
  async index() {
    return await api.get('/medicine')
  },
}

export default medicineService
