import { api } from '.'

type CreateRequestData = {
  requester_hospital_id: string
  medicine_id: string
  priority_id: string
  status_id: string
  quantity: number
  description: string
  due_date: string
  return_date: string
}

type UpdateRequestData = {
  status_id?: string
  due_date?: string
  return_date?: string
}

export const getRequests = async () => {
  return await api.get('/request')
}

export const getRequest = async (id: string) => {
  return await api.get(`/request/${id}`)
}

export const createRequest = async (data: CreateRequestData) => {
  return await api.post('/request', data)
}

export const updateRequest = async (id: string, data: UpdateRequestData) => {
  return await api.patch(`/request/${id}`, data)
}

export const getRequestStatuses = async () => {
  return await api.get('/request/status')
}

export const getRequestPriorities = async () => {
  return await api.get('/request/priority')
}
