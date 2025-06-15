export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export interface Users {
  email: string
  phoneNumber: number
  fullName?: string
  profilePicture?: string
  address?: {
    street: string
    city: string
    state: string
    zip: string
  }
  password: string
}

export interface RegisterUser {
  fullName: string
  email: string
  phoneNumber: number
  password: string
}

export interface LoginUser {
  email: string
  password: string
}

export interface CartItem {
  productId: number
  quantity: number
  price: number
  title: string
  image: string
  category: string
}

export interface Cart {
  items: CartItem[]
  totalPrice: number
}
