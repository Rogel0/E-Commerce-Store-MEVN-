<template>
  <HeaderComponent v-model:selectedCategory="selectedCategory" v-model:searchInput="searchInput" />
  <el-row justify="center" style="margin-top: 200px">
    <el-col :span="12">
      <el-card class="product-card">
        <el-row gutter="24">
          <el-col :span="10" class="image-col">
            <img :src="product?.image" alt="Product Image" class="product-image" />
          </el-col>
          <el-col :span="14" class="info-col">
            <h2 class="product-title">{{ product?.title }}</h2>
            <p class="product-desc">{{ product?.description }}</p>
            <div class="product-price-row">
              <span class="product-price">₱{{ product?.price }}</span>
              <el-button type="primary" class="buy-btn">Buy Now</el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { fetchProductById } from '@/api/services/productService'
import HeaderComponent from '@/components/headerComponent.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const selectedCategory = ref('')
const searchInput = ref('')

const route = useRoute()

const { product, getProductById } = fetchProductById()

onMounted(async () => {
  await getProductById(Number(route.params.id))
})
</script>

<style scoped>
.product-card {
  border-radius: 16px;
  box-shadow:
    0 2px 12px 0 rgba(57, 185, 126, 0.08),
    0 1.5px 4px 0 rgba(40, 41, 40, 0.08);
  padding: 32px 24px;
  background: #fff;
}
.image-col {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 12px;
  min-height: 320px;
}
.product-image {
  max-width: 100%;
  max-height: 280px;
  object-fit: contain;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px 0 #39b97e22;
}
.info-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
  padding-left: 16px;
}
.product-title {
  font-size: 1.6em;
  font-weight: 700;
  color: #222;
  margin-bottom: 8px;
}
.product-desc {
  color: #888;
  font-size: 1em;
  margin-bottom: 16px;
  line-height: 1.6;
  max-height: 120px;
  overflow: auto;
}
.product-price-row {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 16px;
}
.product-price {
  color: #f57224;
  font-size: 2em;
  font-weight: 800;
  letter-spacing: 1px;
}
.buy-btn {
  background: linear-gradient(90deg, #f57224 0%, #fbbd61 100%);
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  padding: 12px 32px;
  font-size: 1.1em;
  box-shadow: 0 2px 8px 0 #f5722422;
  transition:
    background 0.2s,
    box-shadow 0.2s;
}
.buy-btn:hover {
  background: linear-gradient(90deg, #fbbd61 0%, #f57224 100%);
  box-shadow: 0 4px 16px 0 #f5722444;
}
</style>
