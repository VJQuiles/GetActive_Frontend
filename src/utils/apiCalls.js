import axios from 'axios'

const API_BASE = import.meta.env.VITE_SERVER_ORIGIN ?? 'http://localhost:3000'

const apiCall = axios.create({
  baseURL: API_BASE,
})

apiCall.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiCall
