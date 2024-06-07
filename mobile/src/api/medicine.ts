import { api } from '@/api'

const medicineService = {
  async index() {
    return await api.get('/medicine')
  },
  async show(id: string) {
    return await api.get(`/medicine/${id}`)
  },
}

export default medicineService
