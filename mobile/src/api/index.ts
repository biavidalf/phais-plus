import axios from "axios";

const API_BASE_URL = "http://10.50.71.11:8080";

export const api = axios.create({ baseURL: API_BASE_URL });
