import axios from "axios";

const API_BASE_URL = "http://192.168.239.205:8080";

export const api = axios.create({ baseURL: API_BASE_URL });
