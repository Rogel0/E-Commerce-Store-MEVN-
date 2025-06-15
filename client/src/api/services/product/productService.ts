import { fakeStoreApi } from '@/api/api'
import type { Product } from '@/model/types'
import { ref } from 'vue'

const fakeStore = fakeStoreApi

export function fetchProducts() {
  const products = ref<Product[]>([])
  const loading = ref(false)

  const getProducts = async () => {
    loading.value = true
    try {
      const res = await fakeStore.get<Product[]>('/products')
      products.value = res.data
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    getProducts,
  }
}

export const fetchProductById = () => {
  const product = ref<Product | null>(null)

  const getProductById = async (id: number) => {
    try {
      const res = await fakeStore.get<Product>(`/products/${id}`)
      product.value = res.data
    } catch (error) {
      console.error('Failed to fetch product by ID:', error)
    }
  }

  return {
    product,
    getProductById,
  }
}

export const createProduct = async (data: Product): Promise<Product[]> => {
  const res = await fakeStore.post('/products', data)
  return res.data
}

export const updateProduct = async (id: number, data: Product): Promise<Product> => {
  const res = await fakeStore.put(`/products/${id}`, data)
  return res.data
}

export const deleteProduct = async (id: number): Promise<void> => {
  await fakeStore.delete(`/products/${id}`)
}
