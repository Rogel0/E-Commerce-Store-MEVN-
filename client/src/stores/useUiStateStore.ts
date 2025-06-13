import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStateStore = defineStore('uiStateStore', {
  state: () => ({
    loginDialogOpen: false,
    cartDrawerOpen: false,
  }),
  getters: {
    isLoginDialogOpen: (state) => state.loginDialogOpen,
    isCartDrawerOpen: (state) => state.cartDrawerOpen,
  },
  actions: {
    toggleLoginDialog() {
      this.loginDialogOpen = !this.loginDialogOpen
    },
    toggleCartDrawer() {
      this.cartDrawerOpen = !this.cartDrawerOpen
    },
  },
})
