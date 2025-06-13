<template>
  <HeaderComponent v-model:selectedCategory="selectedCategory" v-model:searchInput="searchInput" />
  <CartDrawerComponent />
  <AuthLoginComponent />
  <HeroSectionComponent />
  <LandingPageProduct :selectedCategory="selectedCategory" :search="searchInput" />
</template>

<script setup lang="ts">
import AuthLoginComponent from '@/components/authLoginComponent.vue'
import HeroSectionComponent from '@/components/heroSectionComponent.vue'
import LandingPageProduct from '@/components/landingPageProduct.vue'
import { ref } from 'vue'
import CartDrawerComponent from '@/components/cartDrawerComponent.vue'
import HeaderComponent from '@/components/headerComponent.vue'

const selectedCategory = ref('')
const searchInput = ref('')
</script>

<style scoped></style>
