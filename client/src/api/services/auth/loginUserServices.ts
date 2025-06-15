import { AuthApi } from '@/api/api'
import type { Users } from '@/model/types'

const authApi = AuthApi

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ user: Users; token: string }> => {
  try {
    const response = await authApi.post('/login', { email, password })
    return response.data
  } catch {
    throw new Error('Login failed')
  } finally {
    console.log('Login attempt completed')
  }
}
