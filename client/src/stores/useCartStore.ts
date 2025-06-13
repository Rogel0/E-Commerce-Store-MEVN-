import { defineStore } from 'pinia'
import type { CartItem } from '@/model/types'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]') as CartItem[],
  }),
  getters: {
    getCartItems: (state) => state.cartItems,
    getCartCount: (state) => state.cartItems.length,
  },
  actions: {
    addToCart(item: CartItem) {
      const existingItem = this.cartItems.find((cartItem) => cartItem.productId === item.productId)
      if (existingItem) {
        existingItem.quantity += item.quantity
        return 'updated'
      } else {
        this.cartItems.push(item)
        return 'added'
      }
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    },
    clearCart() {
      this.cartItems = []
      localStorage.removeItem('cartItems')
    },
    increaseQuantity(item: CartItem) {
      const found = this.cartItems.find((i) => i.productId === item.productId)
      if (found) found.quantity++
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    },
    decreaseQuantity(item: CartItem) {
      const found = this.cartItems.find((i) => i.productId === item.productId)
      if (found) {
        if (found.quantity > 1) {
          found.quantity--
        } else {
          this.cartItems = this.cartItems.filter((i) => i.productId !== item.productId)
        }
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
      }
    },
    removeItem(item: CartItem) {
      this.cartItems = this.cartItems.filter((i) => i.productId !== item.productId)
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems))
    },
  },
})
