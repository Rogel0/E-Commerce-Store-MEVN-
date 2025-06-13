<template>
  <el-drawer
    :size="500"
    v-model="uiState.cartDrawerOpen"
    @close="uiState.cartDrawerOpen = false"
    title="Cart"
  >
    <template v-if="cartItems.length === 0">
      <div style="text-align: center; margin-top: 40px; color: #aaa">Your cart is empty.</div>
    </template>
    <template v-else>
      <div
        v-for="item in cartItems"
        :key="item.productId"
        class="cart-item"
        style="
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 16px;
        "
      >
        <img
          :src="item.image"
          alt=""
          style="
            width: 80px;
            height: 80px;
            object-fit: contain;
            border: 1px solid #eee;
            border-radius: 8px;
            background: #fff;
          "
        />
        <div style="flex: 1; display: flex; flex-direction: column; gap: 4px">
          <div style="font-weight: 600; font-size: 1em; line-height: 1.2; margin-bottom: 2px">
            {{ item.title }}
          </div>
          <div v-if="item.category" style="font-size: 0.9em; color: #888; margin-bottom: 2px">
            {{ item.category }}
          </div>
          <div style="font-size: 0.9em; color: #888">₱{{ item.price }}</div>
          <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px">
            <el-button
              size="small"
              circle
              @click="decreaseQuantity(item)"
              style="background: #f5f5f5; border: none"
            >
              <el-icon><Minus /></el-icon>
            </el-button>
            <span style="min-width: 24px; text-align: center; display: inline-block">{{
              item.quantity
            }}</span>
            <el-button
              size="small"
              circle
              @click="increaseQuantity(item)"
              style="background: #f5f5f5; border: none"
            >
              <el-icon><Plus /></el-icon>
            </el-button>
            <el-button
              size="small"
              circle
              type="danger"
              @click="removeItem(item)"
              style="background: #fff; border: none; margin-left: 8px"
            >
              <el-icon><Delete /></el-icon>
            </el-button>
          </div>
        </div>
        <div
          style="
            font-weight: 700;
            color: #f57224;
            min-width: 80px;
            text-align: right;
            font-size: 1.1em;
          "
        >
          ₱{{ (item.price * item.quantity).toFixed(2) }}
        </div>
      </div>
      <div style="text-align: right; font-weight: 700; font-size: 1.1em; margin-top: 24px">
        Total: ₱{{ totalPrice }}
      </div>
      <el-button
        type="primary"
        size="large"
        style="width: 100%; margin-top: 20px"
        @click="onCheckout"
      >
        Checkout
      </el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/useCartStore'
import { Plus, Minus, Delete } from '@element-plus/icons-vue'
import { useUiStateStore } from '@/stores/useUiStateStore'

const uiState = useUiStateStore()

// const props = defineProps<{
//   modelValue: boolean
// }>()

const emit = defineEmits(['update:modelValue'])

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.cartItems)
const totalPrice = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2),
)

const increaseQuantity = (item: any) => cartStore.increaseQuantity(item)
const decreaseQuantity = (item: any) => cartStore.decreaseQuantity(item)
const removeItem = (item: any) => cartStore.removeItem(item)
const onCheckout = () => {
  console.log('Checkout clicked!')
}
</script>

<style scoped></style>
