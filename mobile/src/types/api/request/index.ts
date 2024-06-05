export interface Request {
  id: string
  medicine: { name: string }
  requester_hospital: { name: string }
  status: { name: string }
  priority: { name: string }
}

export interface StoreRequestPayload {
  requester_hospital_id: string
  medicine_id: string
  priority_id: string
  status_id: string
  quantity: number
  description: string
  due_date: string
  return_date: string
}

export interface UpdateRequestPayload {
  status_id?: string
  due_date?: string
  return_date?: string
}
