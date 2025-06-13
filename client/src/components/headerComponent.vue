<template>
  <el-header>
    <el-row
      align="middle"
      justify="space-between"
      style="width: 100%; padding-top: 25px; padding-right: 7%; padding-left: 7%"
    >
      <el-col :span="2" class="centered-col">
        <el-text class="logo-title">MatStore</el-text>
      </el-col>
      <el-col :span="6" class="centered-col">
        <el-input
          v-model="localSearch"
          @input="emit('update:searchInput', localSearch)"
          style="max-width: 600px"
          placeholder="Please input"
          class="input-with-select"
        >
          <template #prepend>
            <el-select
              v-model="localCategory"
              @change="emit('update:selectedCategory', localCategory)"
              placeholder="All Categories"
              style="width: 140px"
              size="large"
            >
              <el-option label="All Categories" value="" />
              <el-option
                v-for="category in categories"
                :key="category"
                :label="category"
                :value="category"
              />
            </el-select>
          </template>
        </el-input>
      </el-col>
      <el-col :span="2" style="text-align: right" class="centered-col">
        <el-select placeholder="Your Location" style="width: 180px" size="large" class="box-shadow">
          <template #prefix>
            <el-icon><Location /></el-icon>
          </template>
          <el-option prop="ph" value="ph">Phillipine</el-option>
        </el-select>
      </el-col>
      <el-col :span="6" class="centered-col">
        <el-button :icon="HelpFilled" text>Compare</el-button>
        <el-badge :value="2"><el-button :icon="Star" text>Wishlist</el-button></el-badge>
        <el-badge :value="cartStore.getCartCount"
          ><el-button :icon="ShoppingCart" @click="uiState.toggleCartDrawer" text
            >Cart</el-button
          ></el-badge
        >
        <el-dropdown v-if="userStore.token">
          <el-button :icon="Avatar" text>Account</el-button>
          <template #dropdown>
            <el-dropdown-item @click="onLogout"> Logout </el-dropdown-item>
          </template>
        </el-dropdown>
        <el-button v-else :icon="Avatar" text @click="uiState.toggleLoginDialog">Login</el-button>
      </el-col>
    </el-row>
  </el-header>
</template>

<script setup lang="ts">
import { fetchProducts } from '@/api/services/productService'
import { useCartStore } from '@/stores/useCartStore'
import { useUserStore } from '@/stores/useUserStore'
import { ElLoading } from 'element-plus'
import { computed, onMounted, ref, watch } from 'vue'
import { Avatar, HelpFilled, Location, ShoppingCart, Star } from '@element-plus/icons-vue'
import { useUiStateStore } from '@/stores/useUiStateStore'

const uiState = useUiStateStore()

const userStore = useUserStore()
const cartStore = useCartStore()

const onLogout = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Registering...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  setTimeout(() => {
    loading.close()
  }, 2000)
  setTimeout(() => {
    userStore.handleLogout()
  }, 2000)
}

const { products, getProducts } = fetchProducts()

onMounted(() => {
  getProducts()
})

const categories = computed(() =>
  Array.from(new Set(products.value.map((p) => p.category).filter(Boolean))),
)

const props = defineProps<{
  selectedCategory: string
  searchInput: string
}>()

const emit = defineEmits(['update:selectedCategory', 'update:searchInput'])

const localSearch = ref(props.searchInput)
const localCategory = ref(props.selectedCategory)

watch(
  () => props.searchInput,
  (newVal) => {
    localSearch.value = newVal
  },
)

watch(
  () => props.selectedCategory,
  (newVal) => {
    localCategory.value = newVal
  },
)
</script>

<style scoped>
.el-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: #fff;
  height: 80px;
}

.logo-title {
  color: #39b97e;
  font-weight: 800;
  font-size: 2em;
}

.input-with-select {
  box-shadow: 2px 2px 8px 0 #39b97e33;
}

.box-shadow {
  box-shadow:
    0 2px 8px 0 rgba(57, 185, 126, 0.12),
    0 1.5px 4px 0 rgba(40, 41, 40, 0.1);
}

:deep(.el-select__selected-item) {
  color: #39b97e;
}

.centered-col {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
