import { api } from '.'

export const getMedicines = async () => {
  return await api.get('/medicine')
}
