import { defineStore } from 'pinia'
import type { Users } from '@/model/types'

type UserState = {
  user: Users | null
  token: string | null
  users: Users[] | null
  isModalVisible: boolean
}

export const useUserStore = defineStore('userStore', {
  state: (): UserState => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token') || null,
    users: [],
    isModalVisible: false,
  }),
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    getUsers: (state) => state.users,
  },
  actions: {
    handleLogin(user: Users, token: string) {
      this.user = user
      this.token = token
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
    },
    handleLogout() {
      this.token = null
      localStorage.removeItem('token')
    },
    handleRegister(user: Users) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
  },
})
