import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStateStore = defineStore('uiStateStore', {
  state: () => ({
    loginDialogOpen: false,
    cartDrawerOpen: false,
    accountDrawerOpen: false,
  }),
  getters: {
    isLoginDialogOpen: (state) => state.loginDialogOpen,
    isCartDrawerOpen: (state) => state.cartDrawerOpen,
    isAccountDrawerOpen: (state) => state.accountDrawerOpen,
  },
  actions: {
    toggleLoginDialog() {
      this.loginDialogOpen = !this.loginDialogOpen
    },
    toggleCartDrawer() {
      this.cartDrawerOpen = !this.cartDrawerOpen
    },
    toggleaccountDrawer() {
      this.accountDrawerOpen = !this.accountDrawerOpen
    },
  },
})
