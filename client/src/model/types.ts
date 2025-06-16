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
  username?: string
  firstName?: string
  lastName?: string
  fullName?: string
  imageUrl?: string
  emailAddresses: {
    id: string
    emailAddress: string
    verification: { status: string }
  }
  phoneNumbers?: {
    id: string
    phoneNumber: string
    verification: { status: string }
  }
  externalAccounts?: {
    provider: string
    emailAddress: string
    firstName?: string
    lastName?: string
    picture?: string
    providerUserId: string
  }
  createdAt: number
  updatedAt: number
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
