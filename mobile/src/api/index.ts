import axios from 'axios'

const API_BASE_URL = 'http://164.90.131.119:8080'

export const api = axios.create({ baseURL: API_BASE_URL })
