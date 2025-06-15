import axios from 'axios'

export const fakeStoreApi = axios.create({
  baseURL: 'https://fakestoreapi.com',
})

export const AuthApi = axios.create({
  baseURL: 'http://localhost:3000/api/auth',
})
