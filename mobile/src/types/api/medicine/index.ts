export interface Medicine {
  id: string
  name: string
  active_principle?: string
  therapeutic_class?: string
  regulatory_category?: string
  process_number: string
  process_end_date?: Date
  registration_number: string
  registration_expiration_date?: Date
  registration_holder_company: string
  registration_status: string
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}
