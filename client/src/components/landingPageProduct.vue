<template>
  <el-container
    style="padding-top: 20px; padding-right: 20%; padding-left: 20%; padding-bottom: 20px"
  >
    <div class="product-container">
      <template v-if="loading">
        <el-card v-for="n in 8" :key="n">
          <div class="image-container">
            <el-skeleton-item variant="image" class="product-image" />
          </div>
          <template #footer>
            <div class="footer">
              <el-skeleton :rows="5" animated style="width: 100%" />
            </div>
          </template>
        </el-card>
      </template>
      <template v-else>
        <el-card v-for="product in filteredProducts" :key="product.id">
          <div class="image-container" @click="handleViewItem(product.id)">
            <img class="product-image" :src="product.image" alt="" />
          </div>
          <template #footer>
            <div class="footer">
              <h3 class="category">{{ product.category }}</h3>
              <h2 class="title">{{ product.title }}</h2>
              <div class="rate">
                <el-rate :model-value="product.rating.rate" disabled size="small"></el-rate>
                <h3>{{ `(${product.rating.count} Review)` }}</h3>
              </div>
              <div class="bottom">
                <h2 class="price">₱{{ product.price }}</h2>
                <el-icon
                  v-if="userStore.token"
                  class="add"
                  @click="handleAddToCart({ ...product, productId: product.id, quantity: 1 })"
                  ><ShoppingCart color="green" :size="20"
                /></el-icon>
              </div>
            </div>
          </template>
        </el-card>
      </template>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { fetchProducts } from '@/api/services/productService'
import { useCartStore } from '@/stores/useCartStore'
import { useUserStore } from '@/stores/useUserStore'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const cartStore = useCartStore()
const userStore = useUserStore()

const { products, loading, getProducts } = fetchProducts()

// Accept selectedCategory as a prop
const props = defineProps<{ selectedCategory: string; search?: string }>()

const filteredProducts = computed(() => {
  let filtered = products.value
  if (props.selectedCategory) {
    filtered = filtered.filter((p) => p.category === props.selectedCategory)
  }
  if (props.search) {
    const searchLower = props.search.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower),
    )
  }
  return filtered
})

onMounted(async () => {
  await getProducts()
})

const handleAddToCart = (item: any) => {
  const result = cartStore.addToCart(item)
  if (result === 'added') {
    ElMessage({ message: 'Item added to cart', type: 'success', duration: 2000 })
  } else if (result === 'updated') {
    ElMessage({ message: 'Item quantity updated in cart', type: 'success', duration: 2000 })
  }
}

const handleViewItem = (id: number) => {
  router.push({ name: 'productDetails', params: { id } })
}
</script>

<style scoped>
.product-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.image-container {
  width: 200px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  overflow: hidden;
}

.image-container:hover {
  cursor: pointer;
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.title {
  font-size: 0.8em;
}

.footer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.add:hover {
  scale: 1.3;
  cursor: pointer;
}

.rate {
  display: flex;
  gap: 10px;
  align-items: center;
}

.rate h3 {
  font-size: 0.8em;
}

.category {
  font-size: 0.8em;
  font-weight: 800;
  color: #b1b1b1;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  color: #63bcef;
}
</style>
