import { AuthApi } from '@/api/api'
import type { Users } from '@/model/types'

const authApi = AuthApi

export const registerUser = async (userData: Users): Promise<Users> => {
  try {
    const response = await authApi.post('/register', userData)
    return response.data
  } catch (error) {
    throw new Error('Registration failed')
  } finally {
    console.log('Registration attempt completed')
  }
}
